const express = require('express'); const app = express(); app.use(express.json({limit:'10mb'}));
app.post('/chat', async (req,res)=>{ res.json({ reply: 'Stub: chat not wired yet.' }); });
app.post('/transcribe', async (req,res)=>{ res.json({ text: 'Stub: transcription not wired yet.' }); });
app.listen(8787, ()=> console.log('Server stub on http://localhost:8787'));