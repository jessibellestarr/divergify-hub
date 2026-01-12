#!/usr/bin/env python3
import os, subprocess, shutil, zipfile, datetime
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive

# Define paths
ROOT = os.path.expanduser("~/Desktop/Divergify")
DIST = os.path.join(ROOT, "dist")
BETA_FOLDER = os.path.join(ROOT, "Divergify_Beta_Builds")
VERSION = datetime.datetime.now().strftime("v%Y.%m.%d_%H%M")

os.chdir(ROOT)

print(f"🚀 Building Divergify Beta {VERSION}...")

# 1. Build Expo web (optional, if using Expo)
subprocess.run(["npx", "expo", "export", "--platform", "web"], check=False)

# 2. Build Electron apps (skip if not yet configured)
subprocess.run(["npx", "electron-builder", "--win", "portable"], check=False)
subprocess.run(["npx", "electron-builder", "--mac", "dmg"], check=False)

# 3. Create ZIP package
os.makedirs(BETA_FOLDER, exist_ok=True)
zip_name = f"Divergify_Beta_{VERSION}.zip"
zip_path = os.path.join(BETA_FOLDER, zip_name)

with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
    for root, _, files in os.walk(DIST):
        for f in files:
            fp = os.path.join(root, f)
            z.write(fp, os.path.relpath(fp, DIST))

print("📦 Packaged into ZIP:", zip_path)

# 4. Upload to Google Drive (manual auth first time)
try:
    gauth = GoogleAuth()
    gauth.LocalWebserverAuth()
    drive = GoogleDrive(gauth)
    folder_id = "YOUR_FOLDER_ID"  # replace with real folder ID from Google Drive
    f = drive.CreateFile({'title': zip_name, 'parents': [{'id': folder_id}]})
    f.SetContentFile(zip_path)
    f.Upload()
    f.InsertPermission({'type': 'anyone', 'value': 'anyone', 'role': 'reader'})
    print("✅ Uploaded to Google Drive successfully!")
    print("🔗 Download link:", f['alternateLink'])
except Exception as e:
    print("⚠️ Skipped Google Drive upload. Error:", e)

print(f"\n✅ Divergify Beta {VERSION} build completed.")

