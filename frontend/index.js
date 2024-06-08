async function sprintChallenge5() {
  let mentorsResponse = await fetch('http://localhost:3003/api/mentors');
  let learnersResponse = await fetch('http://localhost:3003/api/learners');

let mentors = await mentorsResponse.json();
  let learners = await learnersResponse.json();

  learners = learners.map(learner => {
    learner.mentors = learner.mentors.map(name => {
      const mentor = mentors.find(mentor => mentor.name === name);
      return mentor ? mentor.name : 'Unknown Mentor'; 
    });
    return learner;
    
  });

  const cardsContainer = document.querySelector('.cards');
  const info = document.querySelector('.info');
  info.textContent = 'No learner is selected';

  for (let learner of learners) {
    const card = document.createElement('div');
    card.classList.add('card');

   
    card.addEventListener('click', () => {
      
      const allCards = document.querySelectorAll('.card');
      allCards.forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.remove('selected');
        }
      });

      
      card.classList.toggle('selected');

      
      if (card.classList.contains('selected')) {
        info.textContent = `The selected learner is ${learner.fullName}`;
      } else {
        info.textContent = 'No learner is selected';
      }
    });

    const heading = document.createElement('h3');
    heading.textContent = learner.fullName;
    card.appendChild(heading);

    const email = document.createElement('div');
    email.textContent = learner.email;
    card.appendChild(email);

    const mentorsHeading = document.createElement('h4');
    mentorsHeading.textContent = 'Mentors';
    card.appendChild(mentorsHeading);

    const mentorsList = document.createElement('ul');
    mentorsList.style.display = 'none'; 
    

    learner.mentors.forEach(mentor => {
      const mentorItem = document.createElement('li');
      mentorItem.textContent = mentor ? mentor : 'unknown'; 
      card.appendChild(mentorItem);
    });

   



    
    card.addEventListener('click', () => {
      

      if (card.classList.contains('selected')) {
        mentorsList.style.display = 'block';
      } else {
        mentorsList.style.display = 'none';
      }
    });    
    cardsContainer.appendChild(card);
  }

  const footer = document.querySelector('footer');
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 };
else sprintChallenge5();