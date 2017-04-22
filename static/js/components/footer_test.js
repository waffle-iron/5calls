const footer = require('./footer.js');
const expect = require('chai').expect;

describe('footer component', () => {

  it('should not display impact link if user has not made any calls', () => {
  
    let state = {
      userStats: { all: [] }
    };
    
    let result = footer(state);
    
    expect(result.querySelector('#impact__link')).not.to.exist;
  });

  it('should display impact link if user has made  calls', () => {

    let state = {
      userStats: { all: [1] }
    };
    
    let result = footer(state);
    
    expect(result.querySelector('#impact__link')).to.exist;
  });
  
});