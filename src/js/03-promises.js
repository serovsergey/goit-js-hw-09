import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
}
//test git

function onSubmit(evt) {
  evt.preventDefault();
  for (let i = 0; i < Number(amountRef.value); i++) {
    createPromise(i + 1, Number(delayRef.value) + i * Number(stepRef.value))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  // formRef.reset();
}

const formRef = document.querySelector("form");
const delayRef = formRef.querySelector('input[name="delay"]');
const stepRef = formRef.querySelector('input[name="step"]');
const amountRef = formRef.querySelector('input[name="amount"]');

formRef.addEventListener('submit', onSubmit);