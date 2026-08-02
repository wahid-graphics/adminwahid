export default function NotFound() {
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'#FAFAF8',fontFamily:'DM Sans,sans-serif'}}>
      <div style={{fontSize:'96px',fontFamily:'DM Serif Display,serif',color:'#F97316',lineHeight:1}}>404</div>
      <h1 style={{fontSize:'1.5rem',fontWeight:700,color:'#1a1a1a',margin:'16px 0 8px'}}>Page Not Found</h1>
      <p style={{color:'#6b6560',marginBottom:'32px'}}>The page you're looking for doesn't exist.</p>
      <a href="/" style={{background:'#F97316',color:'#fff',padding:'12px 28px',borderRadius:'2px',fontWeight:700,fontSize:'0.8rem',letterSpacing:'.05em',textTransform:'uppercase',textDecoration:'none'}}>← Back to Home</a>
    </div>
  )
}
