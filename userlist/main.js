(function () {
  const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
  const INDEX_URL = BASE_URL + '/api/v1/users/'
  const data = []
  const dataPanel = document.getElementById('data-panel')


  const pagination = document.getElementById('pagination')
  const ITEM_PER_PAGE = 25
  let paginationData = []

  const genderSwitch = document.getElementById('gender-switch')


  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    // displayDataList(data)
    getTotalPages(data)
    getPageData(1, data)
  }).catch((err) => console.log(err))

  // listen to data panel
  dataPanel.addEventListener('click', (event) => {
    if (event.target.matches('.card-img-top')) {
      datasetID = Number((event.target.dataset.id))
      showUser(datasetID)
    }
  })

  // listen to pagination click event
  pagination.addEventListener('click', (event) => {
    console.log(event.target.dataset.page)
    if (event.target.tagName === 'A') {
      getPageData(event.target.dataset.page)
    }
  })

  // listen to form (gender switch)
  genderSwitch.addEventListener('input', (event) => {
    if (event.target.value === 'all') {
      getTotalPages(data)
      getPageData(1, data)
    } else if (event.target.value === 'male') {
      getMaleData(data)
    } else if (event.target.value === 'female') {
      getFealeData(data)
    }
  })

  function showUser(id) {
    // get elements
    const modalTitle = document.getElementById('show-user-title')
    const modalImage = document.getElementById('show-user-image')
    const modalDate = document.getElementById('show-user-date')
    const modalDescription = document.getElementById('show-user-description')

    // set request url
    const url = INDEX_URL + id
    console.log(url)

    // send request to show api
    axios
      .get(url).then((response) => {
        console.log(response.data)
        // insert data into modal ui
        modalTitle.textContent = response.data.name
        modalImage.innerHTML = `<img src="${response.data.avatar}" class="img-fluid" alt="Responsive image">`
        modalDate.textContent = `updated at: ${response.data.updated_at}`
        modalDescription.innerHTML = `
        <pre>id: ${response.data.id}\nname: ${response.data.name}\nsurname: ${response.data.surname}\nemail: ${response.data.email}\ngender: ${response.data.gender}\nage: ${response.data.age}\nregion: ${response.data.region}\nbirthday: ${response.data.birthday}\n</pre>
        `

      })
  }

  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top" src="${item.avatar}" alt="Card image cap" data-toggle="modal" data-target="#show-user-modal" data-id="${item.id}">
            <div class="card-body user-item-body">
              <h6>${item.name}</h6>
            </div>
          </div>
        </div>
      `
    })
    dataPanel.innerHTML = htmlContent
  }

  function getTotalPages(data) {
    let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1
    let pageItemContent = ''
    for (i = 0; i < totalPages; i++) {
      pageItemContent += `
        <li class="page-item">
          <a class="page-link" href="javascript:;"data-page="${i + 1}">${i + 1}</a>
        </li>
      `
    }
    pagination.innerHTML = pageItemContent
  }

  function getPageData(pageNum, data) {
    paginationData = data || paginationData
    let offset = (pageNum - 1) * ITEM_PER_PAGE
    let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE)
    displayDataList(pageData)
  }

  function getMaleData(data) {
    let results = []
    results = data.filter(people => people.gender === 'male')
    getTotalPages(results)
    getPageData(1, results)
  }

  function getFealeData(data) {
    let results = []
    results = data.filter(people => people.gender === 'female')
    getTotalPages(results)
    getPageData(1, results)
  }

})()
