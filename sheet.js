function formatarValor(dados) {
  let d = new Date(dados);
  d.setHours(d.getHours() - 3);
  return d;
}

function noDate(checklists, rooms, mode) {
  if (!mode) {
    let check = [];
    checklists.forEach((checklist) => {
      rooms.forEach((room) => {
        if (room.QRCode === checklist.QRCode) {
          if (!checklist.problemas || checklist.problemas.length === 0) {
            check.push({
              edificio: room.edificio,
              tipo: room.tipo,
              numero: room.numero,
              status: "OK",
              usuario: checklist.usuario,
              data: formatarValor(checklist.data)
            });
          } else {
            check.push({
              edificio: room.edificio,
              tipo: room.tipo,
              numero: room.numero,
              status: "NOK",
              usuario: checklist.usuario,
              data: formatarValor(checklist.data)
            });
          }
        }
      });
    });
    return check;
  } else {
    let check = [];
    checklists.forEach((checklist) => {
      rooms.forEach((room) => {
        if (room.QRCode === checklist.QRCode) {
          if (!checklist.problemas || checklist.problemas.length === 0) {
            check.push({
              edificio: room.edificio,
              tipo: room.tipo,
              numero: room.numero,
              QRCode: checklist.QRCode,
              problemas: "Nenhum",
              usuario: checklist.usuario,
              data: formatarValor(checklist.data)
            });
          } else {
            let problemas = "";
            checklist.problemas.forEach((problem) => {
              problemas += `Recurso: ${problem.recurso}, Categoria: ${problem.categoria}, Obs: ${problem.obs}; `;
            });
            check.push({
              edificio: room.edificio,
              tipo: room.tipo,
              numero: room.numero,
              QRCode: checklist.QRCode,
              problemas,
              usuario: checklist.usuario,
              data: formatarValor(checklist.data)
            });
          }
        }
      });
    });
    return check;
  }
}

module.exports = { noDate };
