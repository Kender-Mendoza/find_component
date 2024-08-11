import Spinnies from 'spinnies'

// spinnies.add('spinner-2', { text: 'I am another spinner' });
// setTimeout(() => {
//   spinnies.succeed('spinner-1', { text: 'Success!' });
//   spinnies.fail('spinner-2', { text: 'Fail :(' });
// }, 2000);

// console.log('Testing')

export const addWaiting = (waitingText: string): Spinnies => {
  const spinnies = new Spinnies();
  spinnies.add('spinner', { text: waitingText });

  return spinnies;
}

export const changeWaitingStatus = (spinnies: Spinnies, status: string): void => {
  setTimeout(() => {
    spinnies.fail('spinner', { text: 'Fail 🐙' });
  }, 1000);
};
