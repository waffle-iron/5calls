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

      var españolLink = result.querySelector('a[href="#es"]')
      var englishLink = result.querySelector('a[href="#en"]')
      var icon = englishLink.querySelector('i')
      var label = englishLink.querySelector('span')
      

      expect(españolLink).not.to.exist;
      expect(englishLink).to.exist;

      expect(icon).to.exist;
      expect(icon.getAttribute('aria-hidden')).to.equal('true');
      expect(icon.getAttribute('class')).to.equal('fa fa-globe');
      
      expect(label).to.exist;
      expect(label.innerHTML).to.equal("English");
    });

    it('should call the chooseLanguage effect when an link is clicked', () => {
      function sendSpy(effect, data) {
        sendSpy.effect = effect;
        sendSpy.data = data;
      }

      let result = footer({
        selectedLanguage: 'es'
      }, {}, sendSpy);

      let link = result.querySelector("a[href='#en']");

      link.onclick({
        preventDefault:function(){},
        stopPropagation:function(){}
      });

      expect(sendSpy.effect).to.equal('chooseLanguage');
      expect(sendSpy.data).to.equal('en');
    });
  });

});