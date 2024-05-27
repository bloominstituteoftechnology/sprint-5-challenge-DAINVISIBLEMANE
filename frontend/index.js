async function sprintChallenge5() { // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  // 🧠 Use Axios to GET learners and mentors.
  // ❗ Use the variables `mentors` and `learners` to store the data.
  // ❗ Use the await keyword when using axios.

  let mentors = []
let learners = []

async function fetchData() {
  try {
    const mentorsResponse = await axios.get('https://api.example.com/mentors')
    mentors = mentorsResponse.data

    const learnersResponse = await axios.get('https://api.example.com/learners')
    learners = learnersResponse.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  // 🧠 Combine learners and mentors.
  // ❗ At this point the learner objects only have the mentors' IDs.
  // ❗ Fix the `learners` array so that each learner ends up with this exact structure:
  function combineLearnersAndMentors() {
    learners.forEach(learner => {
      learner.mentors = mentors.filter(mentor => learner.mentorIds.includes(mentor.id))
        .map(mentor => mentor.fullName)
    })
  }
  
  combineLearnersAndMentors() // Call the function to combine data
  

  // 👆 ==================== TASK 2 END ====================== 👆

  const cardsContainer = document.querySelector('.cards')
  const info = document.querySelector('.info')
  info.textContent = 'No learner is selected'


  // 👇 ==================== TASK 3 START ==================== 👇

  for (let learner of learners) {
    
    const card = document.createElement('div');
    card.classList.add('learner-card');  
    
    const heading = document.createElement('h3');
    heading.classList.add('learner-name');
    heading.textContent = learner.name;
    
    const email = document.createElement('div');
    email.classList.add('learner-email');
    email.textContent = `Email: ${learner.email}`;
  
    
    const mentorsHeading = document.createElement('h4');
    mentorsHeading.classList.add('mentors-heading');
    mentorsHeading.textContent = 'Mentors:';
  
    const mentorsList = document.createElement('ul');
    mentorsList.classList.add('mentors-list');
  
    for (let mentor of learner.mentors) {
      const mentorItem = document.createElement('li');
      mentorItem.textContent = mentor;  // Set mentor name
  
      mentorsList.appendChild(mentorItem);
    }
  
    card.appendChild(heading);
    card.appendChild(email);
    card.appendChild(mentorsHeading);
    card.appendChild(mentorsList);
  
    document.getElementById('learners-container').appendChild(card);
  }
    // 👆 ==================== TASK 3 END ====================== 👆

    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    card.appendChild(mentorsList)
    card.dataset.fullName = learner.fullName
    cardsContainer.appendChild(card)

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4')
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading
      const isCardSelected = card.classList.contains('selected')
      // do a reset of all learner names, selected statuses, info message
      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected')
        crd.querySelector('h3').textContent = crd.dataset.fullName
      })
      info.textContent = 'No learner is selected'
      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add('selected')
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add('selected')
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed')
        } else {
          mentorsHeading.classList.replace('closed', 'open')
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      }
    })
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`


// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
