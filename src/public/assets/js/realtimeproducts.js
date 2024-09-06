const socket = io()

document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault()
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const code = document.getElementById('code').value
    const price = document.getElementById('price').value
    const status = document.getElementById('status').value
    const stock = document.getElementById('stock').value
    const category = document.getElementById('category').value
    console.log('asdfasdsa entroo aca??', title)
    socket.emit('createProduct', { title, description, code, price, status, stock, category})

    document.getElementById('title').value = ''
    document.getElementById('description').value = ''
    document.getElementById('code').value = ''
    document.getElementById('price').value = ''
    document.getElementById('status').value = ''
    document.getElementById('stock').value = ''
    document.getElementById('category').value = ''
})

socket.on('products', (products) => {
    const productList = document.getElementById('product-list')
    productList.innerHTML = ''

    products.forEach(product => {
        const listItem = document.createElement('li')
        listItem.setAttribute('data-id', product.id)

        const title = document.createElement('strong')
        title.textContent = `Título: ${product.title}`

        const description = document.createElement('p')
        description.textContent = `Descripción: ${product.description}`

        const price = document.createElement('p')
        price.textContent = `Precio: ${product.price}`

        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Eliminar'
        deleteButton.classList.add('delete-btn')
        deleteButton.addEventListener('click', function() {
            const id = listItem.getAttribute('data-id')
            socket.emit('deleteProduct', id)
        })

        listItem.appendChild(title)
        listItem.appendChild(description)
        listItem.appendChild(price)
        listItem.appendChild(deleteButton)
        productList.appendChild(listItem)
    })
})