async function sprintChallenge5() {
  // 👇 ==================== TASK 1 START ==================== 👇
  let mentorsResponse = await axios.get('/api/mentors');
  let learnersResponse = await axios.get('/api/learners');
  let mentors = mentorsResponse.data; // Access the data property of the response
  let learners = learnersResponse.data; // Access the data 
  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇
  learners = learners.map(learner => {
    learner.mentors = learner.mentors.map(id => mentors.find(mentor => mentor.id === id).name);
    return learner;
  });
  // 👆 ==================== TASK 2 END ====================== 👆

  const cardsContainer = document.querySelector('.cards')
  const info = document.querySelector('.info')
  info.textContent = 'No learner is selected'

  // 👇 ==================== TASK 3 START ==================== 👇
  for (let learner of learners) {
    const card = document.createElement('div')
    card.classList.add('card');

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
    });
    card.appendChild(mentorsList);

    cardsContainer.appendChild(card);
  }
  // 👆 ==================== TASK 3 END ====================== 👆

  // Check the footer text after all cards have been created
  const footerText = /© BLOOM INSTITUTE OF TECHNOLOGY/i;
  const footerElement = screen.getByText((content, node) => {
    const hasText = (node) => node.textContent === footerText;
    const nodeHasText = hasText(node);
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child)
    );

    return nodeHasText && childrenDontHaveText;
  });

  // ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
  if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
  else sprintChallenge5()
}