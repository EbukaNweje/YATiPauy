import "./newsletter.css"

const Newsletter = () => {
  return (
    <div className='newsletter-bg'>
     <div className='newsletter-wrap'>
      
        <h4>Newsletter</h4>
        <p>Be the first one to know about discounts, offers and events weekly in your <br />
         mailbox. Unsubscribe whenever you like with one click.</p>
 

         <div className="input-submit-wrap">
            <input type="text" placeholder="Enter your email"/>
            <button>Submit</button>
         </div>
     </div>
    </div>
  )
}

export default Newsletter
