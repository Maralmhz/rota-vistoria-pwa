export const abrirRota = (oficina) => {
  const enc = encodeURIComponent(`${oficina.endereco}, ${oficina.cidade}, ${oficina.estado}`)
  const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent)
  if (isMobile) {
    const escolha = window.confirm(`Abrir rota para ${oficina.nome}?\n\nOK = Google Maps\nCancelar = Waze`)
    if (escolha) window.open(`https://maps.google.com/?q=${enc}`, '_blank')
    else window.open(`https://waze.com/ul?q=${enc}&navigate=yes`, '_blank')
  } else {
    window.open(`https://maps.google.com/?q=${enc}`, '_blank')
  }
}
