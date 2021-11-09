afterEach(async () => {
  try {
    await global.dbManager.truncateDb(['migrations']);
  } catch (error) {
    console.log({ error });
  }
});
