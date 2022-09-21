function renameKey ( obj, oldKey, newKey ) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
  
  const json = `
    [
      {
        "_id":"5078c3a803ff4197dc81fbfb",
        "email":"user1@gmail.com",
        "image":"some_image_url",
        "name":"Name 1"
      },
      {
        "_id":"5078c3a803ff4197dc81fbfc",
        "email":"user2@gmail.com",
        "image":"some_image_url",
        "name":"Name 2"
      }
    ]
  `;
     
  const arr = JSON.parse(json);
  arr.forEach( obj => renameKey( obj, 'email', 'newEmail' ) );
  const updatedJson = JSON.stringify( arr );
  
  console.log( updatedJson );