// Margin and padding rules
// margin={[20,0,0,0]} Top margin=20
// margin={[0,20,0,0]} right margin=20
// margin={[0,0,20,0]} Bottom margin=20
// margin={[0,0,0,20]} Left margin=20
// margin={[0,20]} Horizental margin=20
// margin={[20,0]} VERTICAL margin=20
export const   handlePadding = (padding) => {
  if (typeof padding === 'number') {
    return {
      paddingTop: padding,
      paddingRight: padding,
      paddingBottom: padding,
      paddingLeft: padding,
    };
  }

  if (typeof padding === 'object') {
    const paddingSize = Object.keys(padding).length;
    switch (paddingSize) {
      case 1:
        return {
          paddingTop: padding[0],
          paddingRight: padding[0],
          paddingBottom: padding[0],
          paddingLeft: padding[0],
        };
      case 2:
        return {
          paddingTop: padding[0],
          paddingRight: padding[1],
          paddingBottom: padding[0],
          paddingLeft: padding[1],
        };
      case 3:
        return {
          paddingTop: padding[0],
          paddingRight: padding[1],
          paddingBottom: padding[2],
          paddingLeft: padding[1],
        };
      default:
        return {
          paddingTop: padding[0],
          paddingRight: padding[1],
          paddingBottom: padding[2],
          paddingLeft: padding[3],
        };
    }
  }
};

// handle Margin
export const handleMargin = (margin) => {
  if (typeof margin === 'number') {
    return {
      marginTop: margin,
      marginRight: margin,
      marginBottom: margin,
      marginLeft: margin,
    };
  }

  if (typeof margin === 'object') {
    const marginSize = Object.keys(margin).length;
    switch (marginSize) {
      case 1:
        return {
          marginTop: margin[0],
          marginRight: margin[0],
          marginBottom: margin[0],
          marginLeft: margin[0],
        };
      case 2:
        return {
          marginTop: margin[0],
          marginRight: margin[1],
          marginBottom: margin[0],
          marginLeft: margin[1],
        };
      case 3:
        return {
          marginTop: margin[0],
          marginRight: margin[1],
          marginBottom: margin[2],
          marginLeft: margin[1],
        };
      default:
        return {
          marginTop: margin[0],
          marginRight: margin[1],
          marginBottom: margin[2],
          marginLeft: margin[3],
        };
    }
  }
};
