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

  describe('language selection dropdown', () => {
  
    it('should display unselected language as link with globe icon', () => {

      let result = footer({
        selectedLanguage: 'es'
      });

      expect(result.innerHTML).not.to.match(/select/);
      expect(result.innerHTML).to.match(/<a href="#en">\s*<i aria-hidden="true" class="fa fa-globe"><\/i><span>English<\/span>\s*<\/a>/);
      expect(result.innerHTML).not.to.match(/<b>Español<\/b>/);
    });

    it('should call the changeLanguage effect when an link is clicked', () => {

      function sendSpy(effect, data) {
        sendSpy.effect = effect;
        sendSpy.data = data;
      }

      let result = footer({
        selectedLanguage: 'es'
      }, {}, sendSpy);

      let enOption = result.querySelector("a[href='#en']");

      enOption.onclick({
        preventDefault:function(){},
        stopPropagation:function(){}
      });

      expect(sendSpy.effect).to.equal('changeLanguage');
      expect(sendSpy.data).to.equal('en');

    });
  });

});