const dateButton = document.getElementById('dropdown-date')

dateButton.onclick = () => {
    const dateMenu = document.getElementById('date-menu')

    dateButton.classList.toggle('reveal')
}