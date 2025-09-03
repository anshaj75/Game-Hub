async function autoPlay(startGuess) {
  let current = startGuess;
  let low = 1;
  let high = 100;

  while (true) {
    const data = await postForm(ENDPOINTS.GUESS, { guess: String(current) });
    attemptsEl.textContent = String(data.attempts ?? attemptsEl.textContent);

    if (data.result === 'higher') {
      msg.textContent = `Too low! I guessed ${current}, trying higher…`;
      low = current + 1;
      current = Math.floor((low + high) / 2); // next guess halfway
    } else if (data.result === 'lower') {
      msg.textContent = `Too high! I guessed ${current}, trying lower…`;
      high = current - 1;
      current = Math.floor((low + high) / 2);
    } else if (data.result === 'correct') {
      msg.textContent = `🎉 Found it! The number was ${current} in ${data.attempts} attempt(s).`;
      guessInput.disabled = true;
      break;
    }

    // wait 2 seconds before next try
    await new Promise(r => setTimeout(r, 2000));
  }
}
