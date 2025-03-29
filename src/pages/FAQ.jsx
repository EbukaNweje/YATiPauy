import React, { useState } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const FAQ = () => {
    const [dropdown, setDropdown] = useState(null)
  const texts = ["General Questions", "Payments", "Merchants", "Buyers"];
  const accordion = [
    {
      title: "How do i create an account on Billa?",
      content:
        "To create an account on Billa, simply click the 'Create Account' button, and follow the prompts to provide the required information, including your email address and password. Once submitted, you'll receive a confirmation email, and your account will be successfully created.",
    },
    {
      title: "How does Billa work?",
      content:
        "To create an account on Billa, simply click the 'Create Account' button, and follow the prompts to provide the required information, including your email address and password. Once submitted, you'll receive a confirmation email, and your account will be successfully created.",
    },
    {
      title: "Is it free to create an account on Billa?",
      content:
        "To create an account on Billa, simply click the 'Create Account' button, and follow the prompts to provide the required information, including your email address and password. Once submitted, you'll receive a confirmation email, and your account will be successfully created.",
    },
    {
      title: "How can i become a merchant?",
      content:
        "To create an account on Billa, simply click the 'Create Account' button, and follow the prompts to provide the required information, including your email address and password. Once submitted, you'll receive a confirmation email, and your account will be successfully created.",
    },
    {
      title: "Is there a customer support team available for assistance?",
      content:
        "To create an account on Billa, simply click the 'Create Account' button, and follow the prompts to provide the required information, including your email address and password. Once submitted, you'll receive a confirmation email, and your account will be successfully created.",
    },
    {
      title: "Does Billa handle delivery?",
      content:
        "To create an account on Billa, simply click the 'Create Account' button, and follow the prompts to provide the required information, including your email address and password. Once submitted, you'll receive a confirmation email, and your account will be successfully created.",
    },
  ];

  const handleDropdown = (index) =>{
    setDropdown(dropdown === index ? null : index)
  }
  return (
    <div className="w-full h-max flex flex-col items-center pb-10">
      <div className="w-full h-50 bg-blue-600 flex flex-col items-center gap-1.5 text-white justify-center">
        <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
        <h2 className="text-4xl font-bold">(FAQs)</h2>
        <p>Everything you need to know about Billa like a Pro</p>
      </div>
      <div className="w-full h-30 flex items-center justify-center gap-10">
        {texts.map((items) => (
          <p className="text-blue-700 cursor-pointer">{items}</p>
        ))}
      </div>

      <h2 className="w-full h-12 px-64 text-2xl">General Questions</h2>
      <div className="w-210 h-max flex flex-col items-center gap-1 ">
        {accordion.map((props, index) => (
            <>
          <div onClick={() => handleDropdown(index)} key={index} className="w-full h-15 flex items-center justify-between px-3 border-1 border-gray-300 cursor-pointer ">
            <h3>{props.title}</h3>
            <p style={{cursor: "pointer"}}>{dropdown === index ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}</p>
          </div>
          {dropdown === index ? <div className="w-full h-max border-1 border-t-0 border-gray-300 p-2"><p>{props.content}</p></div> : null }
          </>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
