// Interactive Onboarding Tutorial System

class InteractiveOnboarding {
  constructor() {
    this.language = 'english';
    this.tutorialProgress = this.loadProgress();
    this.currentStep = null;
    this.isActive = false;
    
    // Tutorial checkpoints
    this.checkpoints = {
      languageSelected: false,
      comicOpened: false,
      wordClicked: false,
      navigationShown: false,
      storyCompleted: false,
      wordsAddedToVault: false,
      returnedHome: false,
      vaultVisited: false,
      difficultyExplained: false,
      addWordShown: false,
      deleteWordShown: false,
      tagCreated: false,
      quizStarted: false,
      customizeShown: false,
      templateInfoShown: false,
      startQuizInfoShown: false,
      quizCompleted: false,
      templateCreated: false
    };
    
    // Merge saved progress
    Object.assign(this.checkpoints, this.tutorialProgress);
    
    // Tutorial content
    this.translations = {
      english: {
        welcome: "Welcome to G3 Tutorial!",
        letsStart: "Let's learn how to use G3 step by step",
        
        steps: {
          selectComic: {
            title: "Step 1: Choose a Story",
            content: "Click on 'The Little Red Hen' to start reading your first story.",
            action: "Click the comic book to continue"
          },
          openBook: {
            title: "Open the Book",
            content: "Great! Now click 'Open Book' to start reading.",
            action: "Click to begin reading"
          },
          clickWord: {
            title: "Learn New Words",
            content: "Click on an underlined word to see its meaning. You don't need to understand every word.",
            action: "Click any underlined word"
          },
          navigateStory: {
            title: "Navigate the Story",
            content: "Click the arrow button to go to the next page.",
            action: "Click the next button to continue"
          },
          addToVault: {
            title: "Save Your Words",
            content: "Excellent! Now click 'Add words to Word Vault' to save what you've learned.",
            action: "Add words to continue"
          },
          returnHome: {
            title: "Return to Home",
            content: "Click the logo on the left side to go back to the home page.",
            action: "Click the logo to continue"
          },
          goToVault: {
            title: "Visit Word Vault",
            content: "Click the Vault icon to see your saved words.",
            action: "Open Word Vault"
          },
          explainDifficulty: {
            title: "Understanding Difficulty Levels",
            content: "Easy, Medium, and Hard show how well you know each word. Words from comics start as 'Hard'. To make them 'Easy' or 'Medium', you need to do quizzes!",
            action: "Click Next to continue"
          },
          addNewWord: {
            title: "Add Your Own Words",
            content: "You can add new words to your vault using the 'Add New Word' button. Try it out or click Next to skip.",
            action: "Add a word or click Next"
          },
          deleteWord: {
            title: "Remove Words",
            content: "Click the trash icon next to any word to delete it from your vault. Try it or click Next to skip.",
            action: "Delete a word or click Next"
          },
          createTag: {
            title: "Organize with Tags",
            content: "You can use the + button to create custom tags for organizing your words. Tags help you group related words together!",
            action: "Click the + button to continue (or press Escape to skip)"
          },
          startQuiz: {
            title: "Test Your Knowledge",
            content: "Click the Questions icon to create a quiz.",
            action: "Go to quiz section"
          },
          customizeQuiz: {
            title: "Customize Your Quiz",
            content: "Click the pencil icon to customize your quiz settings.",
            action: "Open quiz settings"
          },
          templateInfo: {
            title: "Save Templates",
            content: "You can save your quiz settings as templates here for quick access later.",
            action: "Click Next to continue"
          },
          startQuizInfo: {
            title: "Start Your Quiz",
            content: "Click 'Start Quiz' to begin testing your knowledge!",
            action: "Start quiz or click Next to skip"
          },
          saveTemplate: {
            title: "Save as Template",
            content: "Check 'Save as template' and give it a name for quick access later.",
            action: "Create and start quiz"
          },
          completeQuiz: {
            title: "Complete the Quiz",
            content: "Answer all questions to finish the tutorial!",
            action: "Finish your quiz"
          },
          tutorialComplete: {
            title: "Congratulations! 🎉",
            content: "You've mastered all G3 features! Enjoy learning Telugu!",
            action: "Start exploring on your own"
          }
        }
      },
      
      telugu: {
        welcome: "G3 ట్యుటోరియల్‌కు స్వాగతం!",
        letsStart: "G3ని దశలవారీగా ఎలా ఉపయోగించాలో నేర్చుకుందాం",
        
        steps: {
          selectComic: {
            title: "దశ 1: కథను ఎంచుకోండి",
            content: "మీ మొదటి కథ చదవడం ప్రారంభించడానికి 'The Little Red Hen'పై క్లిక్ చేయండి.",
            action: "కొనసాగడానికి కామిక్ పుస్తకంపై క్లిక్ చేయండి"
          },
          openBook: {
            title: "పుస్తకం తెరవండి",
            content: "అద్భుతం! ఇప్పుడు చదవడం ప్రారంభించడానికి 'Open Book' క్లిక్ చేయండి.",
            action: "చదవడం ప్రారంభించడానికి క్లిక్ చేయండి"
          },
          clickWord: {
            title: "కొత్త పదాలు నేర్చుకోండి",
            content: "అర్థం చూడటానికి అండర్‌లైన్ చేసిన పదంపై క్లిక్ చేయండి. ప్రతి పదాన్ని అర్థం చేసుకోవలసిన అవసరం లేదు.",
            action: "ఏదైనా అండర్‌లైన్ చేసిన పదంపై క్లిక్ చేయండి"
          },
          navigateStory: {
            title: "కథను నావిగేట్ చేయండి",
            content: "తదుపరి పేజీకి వెళ్ళడానికి బాణం బటన్‌పై క్లిక్ చేయండి.",
            action: "కొనసాగడానికి తదుపరి బటన్‌పై క్లిక్ చేయండి"
          },
          addToVault: {
            title: "మీ పదాలను సేవ్ చేయండి",
            content: "అద్భుతం! మీరు నేర్చుకున్న వాటిని సేవ్ చేయడానికి 'Add words to Word Vault' క్లిక్ చేయండి.",
            action: "కొనసాగడానికి పదాలను జోడించండి"
          },
          returnHome: {
            title: "హోమ్‌కు తిరిగి వెళ్ళండి",
            content: "హోమ్ పేజీకి తిరిగి వెళ్ళడానికి ఎడమ వైపున ఉన్న లోగోపై క్లిక్ చేయండి.",
            action: "కొనసాగడానికి లోగోపై క్లిక్ చేయండి"
          },
          goToVault: {
            title: "వర్డ్ వాల్ట్‌ను సందర్శించండి",
            content: "మీ సేవ్ చేసిన పదాలను చూడటానికి Vault చిహ్నంపై క్లిక్ చేయండి.",
            action: "వర్డ్ వాల్ట్ తెరవండి"
          },
          explainDifficulty: {
            title: "కష్ట స్థాయిలను అర్థం చేసుకోవడం",
            content: "Easy, Medium, మరియు Hard అంటే మీకు ప్రతి పదం ఎంత బాగా తెలుసో చూపిస్తాయి. కామిక్స్ నుండి పదాలు 'Hard'గా మొదలవుతాయి. వాటిని 'Easy' లేదా 'Medium' చేయడానికి, మీరు క్విజ్‌లు చేయాలి!",
            action: "కొనసాగడానికి Next క్లిక్ చేయండి"
          },
          addNewWord: {
            title: "మీ స్వంత పదాలను జోడించండి",
            content: "'Add New Word' బటన్ ఉపయోగించి మీ వాల్ట్‌కు కొత్త పదాలను జోడించవచ్చు. ప్రయత్నించండి లేదా దాటవేయడానికి Next క్లిక్ చేయండి.",
            action: "పదం జోడించండి లేదా Next క్లిక్ చేయండి"
          },
          deleteWord: {
            title: "పదాలను తొలగించండి",
            content: "మీ వాల్ట్ నుండి ఏదైనా పదాన్ని తొలగించడానికి దాని పక్కన ఉన్న ట్రాష్ చిహ్నంపై క్లిక్ చేయండి. ప్రయత్నించండి లేదా దాటవేయడానికి Next క్లిక్ చేయండి.",
            action: "పదం తొలగించండి లేదా Next క్లిక్ చేయండి"
          },
          createTag: {
            title: "ట్యాగ్‌లతో నిర్వహించండి",
            content: "మీ పదాలను నిర్వహించడానికి కస్టమ్ ట్యాగ్‌లను సృష్టించడానికి + బటన్‌ను ఉపయోగించవచ్చు. ట్యాగ్‌లు సంబంధిత పదాలను కలిసి సమూహపరచడంలో సహాయపడతాయి!",
            action: "కొనసాగడానికి + బటన్ క్లిక్ చేయండి (లేదా దాటవేయడానికి Escape నొక్కండి)"
          },
          startQuiz: {
            title: "మీ జ్ఞానాన్ని పరీక్షించుకోండి",
            content: "క్విజ్ సృష్టించడానికి Questions చిహ్నంపై క్లిక్ చేయండి.",
            action: "క్విజ్ విభాగానికి వెళ్ళండి"
          },
          customizeQuiz: {
            title: "మీ క్విజ్‌ను అనుకూలీకరించండి",
            content: "మీ క్విజ్ సెట్టింగ్‌లను అనుకూలీకరించడానికి పెన్సిల్ చిహ్నంపై క్లిక్ చేయండి.",
            action: "క్విజ్ సెట్టింగ్‌లు తెరవండి"
          },
          templateInfo: {
            title: "టెంప్లేట్‌లను సేవ్ చేయండి",
            content: "త్వరిత యాక్సెస్ కోసం మీ క్విజ్ సెట్టింగ్‌లను ఇక్కడ టెంప్లేట్‌లుగా సేవ్ చేయవచ్చు.",
            action: "కొనసాగడానికి Next క్లిక్ చేయండి"
          },
          startQuizInfo: {
            title: "మీ క్విజ్ ప్రారంభించండి",
            content: "మీ జ్ఞానాన్ని పరీక్షించుకోవడం ప్రారంభించడానికి 'Start Quiz' క్లిక్ చేయండి!",
            action: "క్విజ్ ప్రారంభించండి లేదా దాటవేయడానికి Next క్లిక్ చేయండి"
          },
          saveTemplate: {
            title: "టెంప్లేట్‌గా సేవ్ చేయండి",
            content: "'Save as template' చెక్ చేసి, తర్వాత త్వరిత యాక్సెస్ కోసం పేరు ఇవ్వండి.",
            action: "క్విజ్ సృష్టించి ప్రారంభించండి"
          },
          completeQuiz: {
            title: "క్విజ్ పూర్తి చేయండి",
            content: "ట్యుటోరియల్ పూర్తి చేయడానికి అన్ని ప్రశ్నలకు సమాధానం ఇవ్వండి!",
            action: "మీ క్విజ్ పూర్తి చేయండి"
          },
          tutorialComplete: {
            title: "అభినందనలు! 🎉",
            content: "మీరు అన్ని G3 ఫీచర్లను నేర్చుకున్నారు! తెలుగు నేర్చుకోవడం ఆనందించండి!",
            action: "మీ స్వంతంగా అన్వేషించడం ప్రారంభించండి"
          }
        }
      }
    };
  }
  
  init() {
    // Check if tutorial is completed
    if (this.checkpoints.tutorialComplete) {
      return;
    }
    
    // Add CSS if not present
    if (!document.querySelector('link[href="onboarding.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'onboarding.css';
      document.head.appendChild(link);
    }
    
    // Start or resume tutorial
    if (!this.checkpoints.languageSelected) {
      this.showLanguageSelection();
    } else {
      this.resumeTutorial();
    }
  }
  
  showLanguageSelection() {
    const modal = document.createElement('div');
    modal.className = 'onboarding-language-modal';
    modal.innerHTML = `
      <div class="language-selection-box">
        <h2>Welcome to G3 Tutorial! • G3 ట్యుటోరియల్‌కు స్వాగతం!</h2>
        <p>This interactive tutorial will guide you through all features<br>
        ఈ ఇంటరాక్టివ్ ట్యుటోరియల్ అన్ని ఫీచర్ల ద్వారా మీకు మార్గనిర్దేశం చేస్తుంది</p>
        <div class="language-buttons">
          <button class="language-btn english" onclick="tutorialGuide.selectLanguage('english')">
            English Tutorial
          </button>
          <button class="language-btn telugu" onclick="tutorialGuide.selectLanguage('telugu')">
            తెలుగు ట్యుటోరియల్
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  
  selectLanguage(lang) {
    this.language = lang;
    this.checkpoints.languageSelected = true;
    this.saveProgress();
    localStorage.setItem('tutorialLanguage', lang);
    
    document.querySelector('.onboarding-language-modal').remove();
    this.startTutorial();
  }
  
  startTutorial() {
    this.isActive = true;
    
    // Show welcome message
    const t = this.translations[this.language];
    this.showMessage(t.welcome, t.letsStart, () => {
      this.showNextStep();
    });
  }
  
  resumeTutorial() {
    this.language = localStorage.getItem('tutorialLanguage') || 'english';
    this.isActive = true;
    this.showNextStep();
  }
  
  showNextStep() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const steps = this.translations[this.language].steps;
    
    // Determine next step based on progress
    if (!this.checkpoints.comicOpened && currentPage === 'index.html') {
      this.showStep('selectComic');
    } else if (this.checkpoints.comicOpened && !this.checkpoints.wordClicked && currentPage === 'index.html') {
      // Comic was just opened but we're still on index page - don't show anything
      return;
    } else if (currentPage.includes('hen')) {
      // We're on the Little Red Hen page
      const hasTextBox = document.querySelector('.text-box');
      const hasStartButton = document.querySelector('#startbtn');
      
      if (hasStartButton && !hasTextBox) {
        // We're on the cover page - show open book instruction
        this.showStep('openBook');
      } else if (hasTextBox && !this.checkpoints.wordClicked) {
        // First page of story after opening - show click word instruction
        this.showStep('clickWord');
      } else if (hasTextBox && this.checkpoints.wordClicked && !this.checkpoints.navigationShown) {
        // After clicking word, show navigation instruction
        this.showStep('navigateStory');
      } else if (this.checkpoints.storyCompleted && !this.checkpoints.wordsAddedToVault) {
        // Story completed, show add to vault
        this.showStep('addToVault');
      } else if (!this.checkpoints.returnedHome && this.checkpoints.wordsAddedToVault) {
        // After adding to vault, show return home
        this.showStep('returnHome');
      }
    } else if (!this.checkpoints.returnedHome && this.checkpoints.wordsAddedToVault && currentPage.includes('hen')) {
      this.showStep('returnHome');
    } else if (!this.checkpoints.vaultVisited) {
      if (currentPage === 'index.html' && this.checkpoints.returnedHome) {
        this.showStep('goToVault');
      } else if (currentPage === 'wordVault.html') {
        this.checkpoints.vaultVisited = true;
        this.saveProgress();
        // Show difficulty explanation first
        this.showStep('explainDifficulty');
      }
    } else if (currentPage === 'wordVault.html' && this.checkpoints.vaultVisited) {
      // Show word vault tutorial steps in order
      if (!this.checkpoints.difficultyExplained) {
        this.showStep('explainDifficulty');
      } else if (!this.checkpoints.addWordShown) {
        this.showStep('addNewWord');
      } else if (!this.checkpoints.deleteWordShown) {
        this.showStep('deleteWord');
      } else if (!this.checkpoints.tagCreated) {
        this.showStep('createTag');
      }
    } else if (!this.checkpoints.quizStarted) {
      if (currentPage === 'index.html' || currentPage === 'wordVault.html') {
        this.showStep('startQuiz');
      } else if (currentPage === 'question.html') {
        this.checkpoints.quizStarted = true;
        this.saveProgress();
        this.showStep('customizeQuiz');
      }
    } else if (currentPage === 'question.html' && this.checkpoints.quizStarted) {
      if (!this.checkpoints.customizeShown) {
        this.showStep('customizeQuiz');
      } else if (!this.checkpoints.templateInfoShown) {
        this.showStep('templateInfo');
      } else if (!this.checkpoints.startQuizInfoShown) {
        this.showStep('startQuizInfo');
      } else if (!this.checkpoints.quizCompleted) {
        // Don't show anything - let user interact with quiz
        return;
      }
    } else if (this.checkpoints.quizCompleted && !this.checkpoints.tutorialComplete) {
      this.completeTutorial();
    }
  }
  
  showStep(stepKey) {
    const step = this.translations[this.language].steps[stepKey];
    if (!step) return;
    
    this.currentStep = stepKey;
    
    // Create overlay
    this.createOverlay();
    
    // Show tooltip with step info
    this.showTooltip(step);
    
    // Highlight relevant element
    this.highlightElement(stepKey);
    
    // Add escape key handler for skippable steps
    if (stepKey === 'createTag') {
      const escapeHandler = (e) => {
        if (e.key === 'Escape') {
          document.removeEventListener('keydown', escapeHandler);
          this.handleStepCompletion();
        }
      };
      document.addEventListener('keydown', escapeHandler);
    }
  }
  
  createOverlay() {
    // Remove existing overlay sections
    document.querySelectorAll('.overlay-top, .overlay-bottom, .overlay-left, .overlay-right').forEach(el => el.remove());
    
    // Create container
    if (!document.querySelector('.onboarding-overlay')) {
      const container = document.createElement('div');
      container.className = 'onboarding-overlay';
      container.style.display = 'block';
      document.body.appendChild(container);
    }
  }
  
  createCutoutOverlay(element) {
    // Get element position and size
    const rect = element.getBoundingClientRect();
    const padding = 10; // Extra space around element
    
    // Create four overlay sections around the element
    const overlayTop = document.createElement('div');
    overlayTop.className = 'overlay-top';
    overlayTop.style.top = '0';
    overlayTop.style.left = '0';
    overlayTop.style.right = '0';
    overlayTop.style.height = Math.max(0, rect.top - padding) + 'px';
    
    const overlayBottom = document.createElement('div');
    overlayBottom.className = 'overlay-bottom';
    overlayBottom.style.bottom = '0';
    overlayBottom.style.left = '0';
    overlayBottom.style.right = '0';
    overlayBottom.style.top = (rect.bottom + padding) + 'px';
    
    const overlayLeft = document.createElement('div');
    overlayLeft.className = 'overlay-left';
    overlayLeft.style.top = Math.max(0, rect.top - padding) + 'px';
    overlayLeft.style.left = '0';
    overlayLeft.style.width = Math.max(0, rect.left - padding) + 'px';
    overlayLeft.style.height = (rect.height + padding * 2) + 'px';
    
    const overlayRight = document.createElement('div');
    overlayRight.className = 'overlay-right';
    overlayRight.style.top = Math.max(0, rect.top - padding) + 'px';
    overlayRight.style.right = '0';
    overlayRight.style.left = (rect.right + padding) + 'px';
    overlayRight.style.height = (rect.height + padding * 2) + 'px';
    
    // Add all sections
    document.body.appendChild(overlayTop);
    document.body.appendChild(overlayBottom);
    document.body.appendChild(overlayLeft);
    document.body.appendChild(overlayRight);
  }
  
  showTooltip(step) {
    // Remove existing tooltip
    const existingTooltip = document.querySelector('.onboarding-tooltip');
    if (existingTooltip) existingTooltip.remove();
    
    const tooltip = document.createElement('div');
    tooltip.className = 'onboarding-tooltip';
    
    // Check if this step needs a Next button
    const hasNextButton = ['explainDifficulty', 'addNewWord', 'deleteWord', 'templateInfo', 'startQuizInfo'].includes(this.currentStep);
    
    if (hasNextButton) {
      tooltip.innerHTML = `
        <h4 style="margin: 0 0 8px 0; color: #2D5A5A; font-size: 16px;">${step.title}</h4>
        <div class="tooltip-content">${step.content}</div>
        <div style="margin-top: 15px; text-align: right;">
          <button class="tooltip-btn next" onclick="tutorialGuide.handleNextClick()">
            ${this.language === 'english' ? 'Next' : 'తదుపరి'}
          </button>
        </div>
      `;
    } else {
      tooltip.innerHTML = `
        <h4 style="margin: 0 0 8px 0; color: #2D5A5A; font-size: 16px;">${step.title}</h4>
        <div class="tooltip-content">${step.content}</div>
      `;
    }
    
    document.body.appendChild(tooltip);
    
    // Get the target element for positioning
    if (this.currentStep === 'selectComic') {
      // Special handling for Little Red Hen comic
      const checkForComic = () => {
        const littleRedHen = this.findLittleRedHenComic();
        if (littleRedHen) {
          this.positionTooltip(tooltip, littleRedHen);
        } else {
          setTimeout(checkForComic, 100);
        }
      };
      checkForComic();
    } else {
      const targetSelector = this.getTargetSelector(this.currentStep);
      if (targetSelector) {
        this.waitForElement(targetSelector, (element) => {
          this.positionTooltip(tooltip, element);
        });
      } else {
        this.positionTooltip(tooltip);
      }
    }
  }
  
  getTargetSelector(stepKey) {
    switch (stepKey) {
      case 'selectComic': return null; // Special handling for Little Red Hen
      case 'openBook': return '#startbtn';
      case 'clickWord': return '.text-box';
      case 'navigateStory': return '#nextBtn';
      case 'addToVault': return 'button[onclick*="addRedHenWords"]';
      case 'returnHome': return '.logo';
      case 'goToVault': return window.innerWidth > 768 ? '.sidebar img[alt="Vault"]' : '.bottom-nav img[alt="Vault"]';
      case 'explainDifficulty': return '.filters'; // The filters container with difficulty buttons
      case 'addNewWord': return '.add-btn'; // The actual class name in HTML
      case 'deleteWord': return '.delete-icon'; // Will need to check this
      case 'createTag': return '.add-tag-btn';
      case 'startQuiz': return window.innerWidth > 768 ? '.sidebar img[alt="Builder"]' : '.bottom-nav img[alt="Builder"]';
      case 'customizeQuiz': return '.customize-btn';
      case 'templateInfo': return '.template-btn';
      case 'startQuizInfo': return '.start-btn';
      case 'saveTemplate': return '#saveAsTemplate';
      default: return null;
    }
  }
  
  highlightElement(stepKey) {
    // Remove existing highlights
    document.querySelectorAll('.spotlight').forEach(el => el.remove());
    
    let selector = null;
    
    switch (stepKey) {
      case 'selectComic':
        // Special handling - find Little Red Hen comic
        const littleRedHen = this.findLittleRedHenComic();
        if (littleRedHen) {
          this.addSpotlight(littleRedHen);
          // Add click handler for comic selection
          const comicClickHandler = () => {
            littleRedHen.removeEventListener('click', comicClickHandler);
            this.clearTutorialElements();
          };
          littleRedHen.addEventListener('click', comicClickHandler);
        }
        return; // Exit early since we handled it
      case 'openBook':
        selector = '#startbtn';
        // Add special tracking for Open Book button
        this.waitForElement('#startbtn', (btn) => {
          const openBookHandler = () => {
            btn.removeEventListener('click', openBookHandler);
            this.clearTutorialElements();
            // The trackBookOpened will be called by startBook()
          };
          btn.addEventListener('click', openBookHandler);
        });
        break;
      case 'clickWord':
        selector = '.text-box';  // Highlight the entire text area
        break;
      case 'navigateStory':
        selector = '#nextBtn';
        // Mark navigation as shown
        this.checkpoints.navigationShown = true;
        this.saveProgress();
        // Add click tracking for next button
        this.waitForElement('#nextBtn', (btn) => {
          const nextHandler = () => {
            btn.removeEventListener('click', nextHandler);
            this.clearTutorialElements();
            // Story continues
          };
          btn.addEventListener('click', nextHandler);
        });
        break;
      case 'addToVault':
        selector = 'button[onclick*="addRedHenWords"]';
        break;
      case 'returnHome':
        selector = '.logo';
        break;
      case 'goToVault':
        selector = window.innerWidth > 768 ? '.sidebar img[alt="Vault"]' : '.bottom-nav img[alt="Vault"]';
        break;
      case 'explainDifficulty':
        // Highlight the filters but don't make them clickable
        this.waitForElement('.filters', (element) => {
          this.addSpotlight(element);
        });
        return;
      case 'addNewWord':
        selector = '.add-btn';
        break;
      case 'deleteWord':
        // Find first delete icon
        selector = '.delete-icon';
        break;
      case 'createTag':
        selector = '.add-tag-btn';
        break;
      case 'startQuiz':
        selector = window.innerWidth > 768 ? '.sidebar img[alt="Builder"]' : '.bottom-nav img[alt="Builder"]';
        break;
      case 'customizeQuiz':
        selector = '.customize-btn';
        break;
      case 'templateInfo':
        selector = '.template-btn';
        break;
      case 'startQuizInfo':
        selector = '.start-btn';
        break;
      case 'saveTemplate':
        selector = '#saveAsTemplate';
        break;
    }
    
    if (selector) {
      this.waitForElement(selector, (element) => {
        this.addSpotlight(element);
      });
    }
  }
  
  waitForElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
      callback(element);
    } else {
      setTimeout(() => this.waitForElement(selector, callback), 100);
    }
  }
  
  findLittleRedHenComic() {
    // Find the Little Red Hen comic by looking for its text content
    const comics = document.querySelectorAll('.comic-book');
    for (let comic of comics) {
      const titleElement = comic.querySelector('.comic-title');
      if (titleElement && titleElement.textContent.includes('Little Red Hen')) {
        return comic;
      }
    }
    return null;
  }
  
  addSpotlight(element) {
    const rect = element.getBoundingClientRect();
    const spotlight = document.createElement('div');
    spotlight.className = 'spotlight';
    spotlight.style.left = (rect.left - 5) + 'px';
    spotlight.style.top = (rect.top - 5) + 'px';
    spotlight.style.width = (rect.width + 10) + 'px';
    spotlight.style.height = (rect.height + 10) + 'px';
    document.body.appendChild(spotlight);
    
    // Create cutout overlay around this element
    this.createCutoutOverlay(element);
    
    // Add click listener to the element to advance tutorial
    // Skip for certain steps that have special handling
    const skipClickHandler = ['openBook', 'selectComic', 'explainDifficulty'].includes(this.currentStep);
    if (!skipClickHandler) {
      const clickHandler = () => {
        element.removeEventListener('click', clickHandler);
        this.handleStepCompletion();
      };
      element.addEventListener('click', clickHandler);
    }
  }
  
  
  positionTooltip(tooltip, targetElement) {
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    if (targetElement) {
      // Position relative to the highlighted element
      const targetRect = targetElement.getBoundingClientRect();
      let left, top;
      
      // Increase spacing from target element
      const spacing = 50; // Increased from 30
      
      // Try to position above the element first
      if (targetRect.top - tooltipRect.height - spacing > 20) {
        // Position above
        top = targetRect.top - tooltipRect.height - spacing;
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
      } 
      // If not enough space above, try below
      else if (targetRect.bottom + tooltipRect.height + spacing < viewportHeight - 20) {
        // Position below
        top = targetRect.bottom + spacing;
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
      }
      // If not enough space above or below, position to the side
      else if (targetRect.left - tooltipRect.width - spacing > 20) {
        // Position to the left
        left = targetRect.left - tooltipRect.width - spacing;
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
      } else {
        // Position to the right
        left = targetRect.right + spacing;
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
      }
      
      // Keep within viewport
      left = Math.max(20, Math.min(viewportWidth - tooltipRect.width - 20, left));
      top = Math.max(20, Math.min(viewportHeight - tooltipRect.height - 20, top));
      
      tooltip.style.left = left + 'px';
      tooltip.style.top = top + 'px';
    } else {
      // Default center positioning if no target element
      const left = (viewportWidth - tooltipRect.width) / 2;
      const top = (viewportHeight - tooltipRect.height) / 2;
      
      tooltip.style.left = Math.max(20, Math.min(viewportWidth - tooltipRect.width - 20, left)) + 'px';
      tooltip.style.top = Math.max(20, Math.min(viewportHeight - tooltipRect.height - 20, top)) + 'px';
    }
  }
  
  showMessage(title, content, callback) {
    const messageBox = document.createElement('div');
    messageBox.className = 'onboarding-tooltip';
    messageBox.style.textAlign = 'center';
    messageBox.innerHTML = `
      <h2 style="color: #2D5A5A; margin-bottom: 15px;">${title}</h2>
      <p style="font-size: 18px; margin-bottom: 20px;">${content}</p>
      <button class="tooltip-btn next" onclick="tutorialGuide.dismissMessage()">
        ${this.language === 'english' ? "Let's Start!" : "ప్రారంభిద్దాం!"}
      </button>
    `;
    
    document.body.appendChild(messageBox);
    // Position the welcome message at the top of the screen
    messageBox.style.position = 'fixed';
    messageBox.style.top = '50px';
    messageBox.style.left = '50%';
    messageBox.style.transform = 'translateX(-50%)';
    
    this.messageCallback = callback;
  }
  
  dismissMessage() {
    document.querySelector('.onboarding-tooltip').remove();
    if (this.messageCallback) {
      this.messageCallback();
      this.messageCallback = null;
    }
  }
  
  handleNextClick() {
    // Handle Next button clicks for skippable steps
    this.clearTutorialElements();
    
    switch (this.currentStep) {
      case 'explainDifficulty':
        this.checkpoints.difficultyExplained = true;
        break;
      case 'addNewWord':
        this.checkpoints.addWordShown = true;
        break;
      case 'deleteWord':
        this.checkpoints.deleteWordShown = true;
        break;
      case 'templateInfo':
        this.checkpoints.templateInfoShown = true;
        break;
      case 'startQuizInfo':
        this.checkpoints.startQuizInfoShown = true;
        this.checkpoints.tutorialComplete = true;
        this.saveProgress();
        this.completeTutorial();
        return;
    }
    
    this.saveProgress();
    this.showNextStep();
  }
  
  handleStepCompletion() {
    // Clear tutorial elements
    this.clearTutorialElements();
    
    // Handle specific step completions
    switch (this.currentStep) {
      case 'returnHome':
        this.checkpoints.returnedHome = true;
        this.saveProgress();
        // Will show goToVault when index page loads
        break;
      case 'goToVault':
        this.checkpoints.vaultVisited = true;
        this.saveProgress();
        // Will show explainDifficulty when vault page loads
        break;
      case 'addNewWord':
        this.checkpoints.addWordShown = true;
        this.saveProgress();
        // Show next step after a short delay
        setTimeout(() => this.showNextStep(), 500);
        break;
      case 'deleteWord':
        this.checkpoints.deleteWordShown = true;
        this.saveProgress();
        // Show next step after a short delay
        setTimeout(() => this.showNextStep(), 500);
        break;
      case 'createTag':
        this.checkpoints.tagCreated = true;
        this.saveProgress();
        setTimeout(() => this.showNextStep(), 500);
        break;
      case 'startQuiz':
        // Navigation will handle the rest
        break;
      case 'customizeQuiz':
        this.checkpoints.customizeShown = true;
        this.saveProgress();
        // Will show templateInfo after customize modal closes
        break;
      default:
        // For other steps, just clear and wait for page-specific handlers
        break;
    }
  }
  
  // Track progress methods
  trackComicOpened() {
    if (this.isActive && !this.checkpoints.comicOpened) {
      this.checkpoints.comicOpened = true;
      this.saveProgress();
      this.clearTutorialElements();
      // Don't show next step here - let the comic page handle it when it loads
    }
  }
  
  trackBookOpened() {
    if (this.isActive) {
      this.clearTutorialElements();
      // Wait for page to render before showing next step
      setTimeout(() => {
        this.showNextStep();
      }, 300);
    }
  }
  
  trackWordClicked() {
    if (this.isActive && !this.checkpoints.wordClicked) {
      this.checkpoints.wordClicked = true;
      this.saveProgress();
      this.clearTutorialElements();
      // Don't show next step yet - wait for popup to close
    }
  }
  
  trackPopupClosed() {
    if (this.isActive && this.checkpoints.wordClicked && !this.checkpoints.navigationShown) {
      // Now show the navigation instruction
      setTimeout(() => {
        this.showNextStep();
      }, 300);
    }
  }
  
  trackStoryCompleted() {
    if (this.isActive && !this.checkpoints.storyCompleted) {
      this.checkpoints.storyCompleted = true;
      this.saveProgress();
      this.showNextStep();
    }
  }
  
  trackWordsAddedToVault() {
    if (this.isActive && !this.checkpoints.wordsAddedToVault) {
      this.checkpoints.wordsAddedToVault = true;
      this.saveProgress();
      this.clearTutorialElements();
      // Show the return home step instead of auto-redirecting
      setTimeout(() => {
        this.showNextStep();
      }, 500);
    }
  }
  
  trackTagCreated() {
    if (this.isActive && !this.checkpoints.tagCreated) {
      this.checkpoints.tagCreated = true;
      this.saveProgress();
      setTimeout(() => {
        this.showNextStep();
      }, 1000);
    }
  }
  
  
  trackTemplateCreated() {
    if (this.isActive && !this.checkpoints.templateCreated) {
      this.checkpoints.templateCreated = true;
      this.saveProgress();
      this.clearTutorialElements();
    }
  }
  
  trackQuizCompleted() {
    if (this.isActive && !this.checkpoints.quizCompleted) {
      this.checkpoints.quizCompleted = true;
      this.saveProgress();
      setTimeout(() => {
        this.completeTutorial();
      }, 2000);
    }
  }
  
  completeTutorial() {
    this.checkpoints.tutorialComplete = true;
    this.saveProgress();
    
    const step = this.translations[this.language].steps.tutorialComplete;
    this.clearTutorialElements();
    
    const completionBox = document.createElement('div');
    completionBox.className = 'onboarding-tooltip';
    completionBox.style.textAlign = 'center';
    completionBox.innerHTML = `
      <h2 style="color: #2D5A5A; margin-bottom: 15px; font-size: 28px;">${step.title}</h2>
      <p style="font-size: 18px; margin-bottom: 25px;">${step.content}</p>
      <button class="tooltip-btn next" style="font-size: 18px; padding: 12px 30px;" 
              onclick="tutorialGuide.finishTutorial()">
        ${this.language === 'english' ? "Start Learning!" : "నేర్చుకోవడం ప్రారంభించండి!"}
      </button>
    `;
    
    document.body.appendChild(completionBox);
    this.positionTooltip(completionBox);
  }
  
  finishTutorial() {
    this.isActive = false;
    this.clearTutorialElements();
    window.location.href = 'index.html';
  }
  
  clearTutorialElements() {
    // Remove all tutorial elements
    document.querySelectorAll('.onboarding-overlay').forEach(el => el.remove());
    document.querySelectorAll('.onboarding-tooltip').forEach(el => el.remove());
    document.querySelectorAll('.spotlight').forEach(el => el.remove());
    document.querySelectorAll('.overlay-top, .overlay-bottom, .overlay-left, .overlay-right').forEach(el => el.remove());
  }
  
  saveProgress() {
    localStorage.setItem('tutorialProgress', JSON.stringify(this.checkpoints));
  }
  
  loadProgress() {
    const saved = localStorage.getItem('tutorialProgress');
    return saved ? JSON.parse(saved) : {};
  }
  
  resetTutorial() {
    localStorage.removeItem('tutorialProgress');
    localStorage.removeItem('tutorialLanguage');
    this.checkpoints = {
      languageSelected: false,
      comicOpened: false,
      wordClicked: false,
      navigationShown: false,
      storyCompleted: false,
      wordsAddedToVault: false,
      returnedHome: false,
      vaultVisited: false,
      difficultyExplained: false,
      addWordShown: false,
      deleteWordShown: false,
      tagCreated: false,
      quizStarted: false,
      customizeShown: false,
      templateInfoShown: false,
      startQuizInfoShown: false,
      quizCompleted: false,
      templateCreated: false,
      tutorialComplete: false
    };
    window.location.reload();
  }
}

// Initialize tutorial guide
const tutorialGuide = new InteractiveOnboarding();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => tutorialGuide.init());
} else {
  tutorialGuide.init();
}

// Export for use in other files
window.tutorialGuide = tutorialGuide;