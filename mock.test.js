// Demo 2: testing a function that talks to an external service, using a mock.

function greetUser(emailService, user) {
  const text = `Hello, ${user.name}!`;
  emailService.send(user.email, text);
  return text;
}

test('greetUser sends a greeting to the user email', () => {
  const fakeEmail = { send: jest.fn() }; // fake: does nothing, just records calls

  greetUser(fakeEmail, { name: 'Anna', email: 'anna@example.com' });

  expect(fakeEmail.send).toHaveBeenCalledTimes(1);
  expect(fakeEmail.send).toHaveBeenCalledWith('anna@example.com', 'Hello, Anna!');
});

test('a mock can also return values', () => {
  const fakeRate = jest.fn().mockReturnValue(1.5);

  expect(fakeRate('EUR')).toBe(1.5);
  expect(fakeRate).toHaveBeenCalledWith('EUR');
});
