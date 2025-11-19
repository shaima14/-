document.addEventListener("DOMContentLoaded", () => {

  const headers = document.querySelectorAll('.accordion-header');

  document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none');
  headers.forEach(h => h.classList.remove('active'));

  headers.forEach(header => {
    header.addEventListener('click', function () {
      const currentHeader = this;
      const currentContent = currentHeader.nextElementSibling;
      const currentArrow = currentHeader.querySelector('i');

      const openHeader = document.querySelector('.accordion-header.active');
      if (openHeader && openHeader !== currentHeader) {
        openHeader.classList.remove('active');
        const openContent = openHeader.nextElementSibling;
        if (openContent) openContent.style.display = 'none';
        const openIcon = openHeader.querySelector('i');
        if (openIcon) {
          openIcon.classList.remove('hgi-arrow-up-01');
          openIcon.classList.add('hgi-arrow-down-01');
        }
      }

      const isNowOpen = currentHeader.classList.toggle('active');

      if (isNowOpen) {
        if (currentContent) currentContent.style.display = 'block';
        if (currentArrow) {
          currentArrow.classList.remove('hgi-arrow-down-01');
          currentArrow.classList.add('hgi-arrow-up-01');
        }
      } else {
        if (currentContent) currentContent.style.display = 'none';
        if (currentArrow) {
          currentArrow.classList.remove('hgi-arrow-up-01');
          currentArrow.classList.add('hgi-arrow-down-01');
        }
      }
    });
  });


  let yesCount = 0;
  let noCount = 100;

  const yesButton = document.getElementById('yes-btn');
  const noButton = document.getElementById('no-btn');
  const statsText = document.getElementById('stats');

  const statsElem = document.getElementById('stats');
  if (statsElem) {
    const dataYes = statsElem.getAttribute('data-yes');
    const dataNo = statsElem.getAttribute('data-no');
    if (dataYes !== null && !isNaN(parseInt(dataYes))) yesCount = parseInt(dataYes, 10);
    if (dataNo !== null && !isNaN(parseInt(dataNo))) noCount = parseInt(dataNo, 10);
  }

  function updateStats() {
    const total = yesCount + noCount;
    const yesPercentage = total === 0 ? 0 : ((yesCount / total) * 100);
    const formatted = yesPercentage.toFixed(1);
    if (statsText) {
      statsText.textContent = `${formatted}% من المستخدمين قالوا نعم من ${total} تعليقًا.`;
    }
  }

  if (yesButton && noButton) {
    yesButton.addEventListener('click', () => {
      yesCount++;
      yesButton.classList.add('clicked');
      noButton.classList.remove('clicked');
      updateStats();
    });

    noButton.addEventListener('click', () => {
      noCount++;
      noButton.classList.add('clicked');
      yesButton.classList.remove('clicked');
      updateStats();
    });
  }

  updateStats();

}); 
