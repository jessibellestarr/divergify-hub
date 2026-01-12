export default function Support(){ return (<form action="/api/tip" method="POST"><h1>Tip Jar</h1>
<select name="amount"><option value="small">$3</option><option value="medium">$7</option><option value="large">$15</option></select>
<button type="submit">Send tip</button></form>); }
