function makeFriendsList(friends) {
  
  let newUl = document.createElement('Ul');
  
  for (const fr of friends) {
    let newLi = document.createElement('LI');
    newLi.textContent = fr.firstName + ' ' + fr.lastName;
    newUl.append(newLi);
  }

  return newUl;
}