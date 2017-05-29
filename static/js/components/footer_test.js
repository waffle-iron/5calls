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
  
    it('should display with detected language selected', () => {

      let result = footer({
        selectedLanguage: 'es'
      });
      expect(result.innerHTML).to.match(/select/);
      expect(result.innerHTML).to.match(/<option value="en">en<\/option>/);
      expect(result.innerHTML).to.match(/<option selected="selected" value="es">es<\/option>/);
    });

    it('should call the changeLanguage effect when an option is selected', () => {

      function sendSpy(effect, data) {
        sendSpy.effect = effect;
        sendSpy.data = data;
      }

      let result = footer({
        selectedLanguage: 'es'
      }, {}, sendSpy);

      let esOption = result.getElementsByTagName("option")[1];
      let languageDropdown = result.getElementsByTagName("select")[0];

      languageDropdown.onchange({target:esOption});

      expect(sendSpy.effect).to.equal('changeLanguage');
      expect(sendSpy.data).to.equal('es');

    });
  });

});