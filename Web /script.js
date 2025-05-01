// Función para obtener la mejor imagen disponible del usuario (si tiene)
function getAvatarUrl(user) {
  if (user.icon && Array.isArray(user.icon.resourceList) && user.icon.resourceList.length > 0) {
    const exact = user.icon.resourceList.find(r => r.width === 121 && r.height === 121 && r.url);
    if (exact) {
      return exact.url;
    }

    const sortedResources = user.icon.resourceList
      .filter(r => r.url)
      .sort((a, b) => (a.width * a.height) - (b.width * b.height));
    if (sortedResources.length > 0) {
      return sortedResources[0].url;
    }
  }
  return ''; 
}

// Función para formatear la fecha de la última apertura
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
}

// Función para renderizar los usuarios
function renderUsers(users) {
  const container = document.getElementById("userList");
  container.innerHTML = ""; 

  users.forEach(user => {
    const userCard = document.createElement('div');
    userCard.classList.add('user-card');

    // Crear avatar correctamente
    const avatar = document.createElement('div');
    avatar.classList.add('avatar');
    const avatarImage = document.createElement('img');
    avatarImage.src = getAvatarUrl(user);
    avatar.appendChild(avatarImage);

    const userInfo = document.createElement('div');
    userInfo.classList.add('user-info');

    const userName = document.createElement('h3');
    userName.textContent = user.nickname || 'Nombre no disponible';
    userInfo.appendChild(userName);

    const userSocialId = document.createElement('p');
    userSocialId.textContent = `ID Social: ${user.socialId || 'No disponible'}`;
    userInfo.appendChild(userSocialId);

    const userGender = document.createElement('p');
    userGender.textContent = `Género: ${user.gender === 1 ? 'Masculino' : user.gender === 2 ? 'Femenino' : 'No especificado'}`;
    userInfo.appendChild(userGender);

    const userStatus = document.createElement('p');
    userStatus.textContent = `Estado: ${user.status === 1 ? 'Activo' : 'Inactivo'}`;
    userInfo.appendChild(userStatus);

    // Agregar la dirección de ubicación
    const userLocation = document.createElement('p');
    const location = user.location?.address?.es || 'Dirección no disponible';
    userLocation.textContent = `Ubicación: ${location}`;
    userInfo.appendChild(userLocation);

    // Agregar la fecha de la última apertura
    const userLastOpenDate = document.createElement('p');
    const lastOpenDate = user.extensions?.lastOpenDate ? formatDate(user.extensions.lastOpenDate) : 'Fecha no disponible';
    userLastOpenDate.textContent = `Última apertura: ${lastOpenDate}`;
    userInfo.appendChild(userLastOpenDate);

    const profileButton = document.createElement('button');
    profileButton.classList.add('profile-button');
    profileButton.textContent = 'Ver Perfil';
    profileButton.onclick = () => {
      window.open(`https://clover.space/s/u/${user.socialId}`, '_blank');
    };

    userInfo.appendChild(profileButton);

    userCard.appendChild(avatar);
    userCard.appendChild(userInfo);
    container.appendChild(userCard);
  });
}

// Función para obtener todos los usuarios desde la API
async function fetchAllUsers(pageToken = '', collectedUsers = []) {
  const baseUrl = 'https://api.clover.space/f/v1/users/namecards';
  const corsProxy = 'https://cors-anywhere.herokuapp.com/';
  const fullUrl = pageToken ? `${baseUrl}?pageToken=${pageToken}` : `${baseUrl}?size=30`;
  const finalUrl = corsProxy + fullUrl;

  console.log('Haciendo petición a:', finalUrl);

  try {
    const response = await fetch(finalUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Respuesta recibida:', data);

    if (data.list && Array.isArray(data.list)) {
      collectedUsers = collectedUsers.concat(data.list);
    }

    if (data.nextPageToken) {
      console.log('Siguiente página:', data.nextPageToken);
      return fetchAllUsers(data.nextPageToken, collectedUsers);
    } else {
      return collectedUsers;
    }
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
}

// Función principal para obtener los usuarios y renderizarlos
async function main() {
  try {
    const users = await fetchAllUsers();
    console.log('Usuarios totales:', users.length);
    if (users.length > 0) {
      renderUsers(users);
    } else {
      document.getElementById('userList').innerHTML = '<p>No se encontraron usuarios.</p>';
    }
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    document.getElementById('userList').innerHTML = '<p>Error al cargar usuarios.</p>';
  }
}

// Llamar a la función principal
main();

// Función para el botón "Crear servidor CRROS"
document.getElementById("createServerButton").addEventListener("click", () => {
  alert('Servidor CRROS activado (Demo).');
  // Aquí iría la lógica para activar el servidor CRROS
});

 // Agregar la funcionalidad al botón de actualizar utilizando window.location.href
  document.getElementById('reloadButton').addEventListener('click', function() {
    window.location.href = window.location.href; // Recargar la página
  });
