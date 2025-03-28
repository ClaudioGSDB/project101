export const rocketHoverVariants = {
    hover: {
      scale: 1.1,
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
    }
  };
  
  export const rocketExhaustVariants = {
    initial: { 
      scaleY: 0,
      opacity: 0,
      height: '0px'
    },
    hover: {
      scaleY: 1,
      opacity: 1,
      height: '20px',
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
    }
  };