const imagesData  = [
    ['https://media.giphy.com/media/3oD3Yrwt1gRDhiQZ5S/giphy.gif', 'Who am I'],
    ['https://media.giphy.com/media/3oD3YiCUVULluiN9WU/giphy.gif', 'Happy sausage'],
    ['https://media.giphy.com/media/3oD3YLTOkztY9xfiQE/giphy.gif', 'Stripes'],
    ['https://media.giphy.com/media/l3UcCohhJm3KEhTWw/giphy.gif', 'Tornadoes'],
    ['https://media.giphy.com/media/3oD3YiL23DDll9bAWc/giphy.gif', 'Walking squares'],
    ['https://media.giphy.com/media/26ufjJgVk087WtjEI/giphy.gif', 'Cubes'],
    ['https://media.giphy.com/media/l3Ucp4ROadmpk7aVy/giphy.gif', 'Hairy'],
    ['https://media.giphy.com/media/3oD3YOacdm13voG59K/giphy.gif', 'The Beanstalk'],
    ['https://media.giphy.com/media/l3UcDs1plijcJfOzC/giphy.gif', 'Tiles'],
    ['https://media.giphy.com/media/3oD3YnBHaVfd0rSY1i/giphy.gif', 'In and Out'],
    ['https://media.giphy.com/media/26ACqq4q3I8UDF3IA/giphy.gif', 'Switching points']
  ];
  
  document.addEventListener("DOMContentLoaded", function() {
      generateCards(imagesData);
  
      const cardsList = document.getElementById('cards-list');
  
      cardsList.addEventListener('wheel', (e) => {
          e.preventDefault();
          cardsList.scrollLeft += e.deltaY;
      });
  
      const cards = document.querySelectorAll('.card');
      let currentlyZoomedCard = null;
  
      cards.forEach((card) => {
          card.addEventListener('mouseover', () => {
              if (card !== currentlyZoomedCard) {
                  card.style.transform = 'scale(0.9)';
                  card.style.transition = 'transform 0.3s ease';
              }
          });
  
          card.addEventListener('mouseout', () => {
              if (card !== currentlyZoomedCard) {
                  card.style.transform = 'scale(1)';
              }
          });
  
          card.addEventListener('click', () => {
              const cardRect = card.getBoundingClientRect();
              const listRect = cardsList.getBoundingClientRect();
              const offset = (cardRect.left + cardRect.right) / 2 - (listRect.left + listRect.right) / 2;
              cardsList.scrollLeft += offset;
  
              cards.forEach(c => {
                  c.style.transition = 'transform 0.5s ease';
                  if (c !== card) {
                      c.style.transform = 'scale(0.7)';
                      c.style.zIndex = '1';
                  }
              });
              card.style.transform = 'scale(1.5)';
              card.style.zIndex = '10';
              currentlyZoomedCard = card;
          });
      });

      document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && currentlyZoomedCard) {
              cards.forEach(card => {
                  card.style.transform = 'scale(1)';
                  card.style.zIndex = '1';
                  card.style.transition = 'transform 0.5s ease';
              });
              currentlyZoomedCard = null;
          }
      });
  });
