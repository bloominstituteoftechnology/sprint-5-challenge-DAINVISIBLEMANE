const axios = require ('axios')
async function sprintChallenge5() {
  let mentorsResponse = await axios.get('/api/mentors');
  let learnersResponse = await axios.get('/api/learners');
  let mentors = mentorsResponse.data;
  let learners = learnersResponse.data;

  learners = learners.map(learner => {
    learner.mentors = learner.mentors.map(id => mentors.find(mentor => mentor.id === id).name);
    return learner;
  });

  const cardsContainer = document.querySelector('.cards')
  const info = document.querySelector('.info')
  info.textContent = 'No learner is selected'
  

  for (let learner of learners) {
    const card = document.createElement('div')
    card.classList.add('card');

    // Add an event listener to the card
    card.addEventListener('click', () => {
  // Deselect all other cards
  const allCards = document.querySelectorAll('.card');
  allCards.forEach((otherCard) => {
    if (otherCard !== card) {
      otherCard.classList.remove('selected');
    }
  });

  // Toggle the 'selected' class on the clicked card
  card.classList.toggle('selected');

  // Update the info text based on whether the card is selected
  if (card.classList.contains('selected')) {
    info.textContent = `The selected learner is ${learner.fullName}`;
  } else {
    info.textContent = 'No learner is selected';
  }
});

    const heading = document.createElement('h3')
    heading.textContent = learner.fullName;
    card.appendChild(heading);

    const email = document.createElement('div')
    email.textContent = learner.email;
    card.appendChild(email);

    const mentorsHeading = document.createElement('h4')
    mentorsHeading.textContent = 'Mentors';
    card.appendChild(mentorsHeading);

    const mentorsList = document.createElement('ul')
    learner.mentors.forEach(mentor => {
      const mentorItem = document.createElement('li');
      mentorItem.textContent = mentor;
      mentorsList.appendChild(mentorItem);
      mentorsList.style.display = 'none';

      if (card.classList.contains('selected')) {
        mentorsList.style.display = 'block';
      } else {
        mentorsList.style.display = 'none';
      }
    });
    
    card.appendChild(mentorsList);

    cardsContainer.appendChild(card);
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()

