<main>
    <form>
      <div>
          <label for="name">Name</label>
          <input
            type="text"
            id="usernmae"
            name="username"
            value=""
          />
      </div>
      <div>
        <label for="name">Age</label>
        <input
          type="age"
          id="age"
          name="age"
          value=""
        />
        <div>
            <label for="name">Sex</label>
            <input
              type="sex"
              id="sex"
              name="sex"
              value=""
        />
        <div>
            <label for="Location">Income</label>
            <input
              type="location"
              id="location"
              name="location"
              value=""
            />
    </div>
    <div>
        <label for="name">Household Size</label>
        <input
          type="household"
          id="household"
          name="household"
          value=""
        />
      <button type="submit">Submit</button>
    </form>
  </main>
  
  <style>
     * {
        box-sizing: border-box;
      }
      form {
        display: flex;
        flex-direction: column;
        width: 300px;
      }
  
      form > div{
        display: flex;
        justify-content: space-between;
      }
  
      form > div + * {
        margin-top: 10px;
      }
  </style>