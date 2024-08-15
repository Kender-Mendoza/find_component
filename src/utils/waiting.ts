import Spinnies from 'spinnies'

type waitingStatus = 'fail' | 'succeed';

export const addWaiting = (waitingText: string): Spinnies => {
  const spinnies = new Spinnies();
  spinnies.add('spinner', { text: waitingText });

  return spinnies;
}

export const changeWaitingStatus = (spinnies: Spinnies, status: waitingStatus, message: string): void => {
  setTimeout(() => {
    switch (status) {
      case 'succeed':
        spinnies.succeed('spinner', { text: `Success! ✨: ${message}` });
        break;

      case 'fail':
        spinnies.fail('spinner', { text: `Fail 🐙: ${message}` });
        break;
    }
  }, 1000);
};
