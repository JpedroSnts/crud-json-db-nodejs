class ProductAJAX {
    static _throwHtmlError(errors) {
        const $errorArea = document.querySelector('#errors');
        $errorArea.innerHTML = '';
        for (let i in errors) $errorArea.innerHTML += ProductAJAX._htmlError(errors[i]);
        document.querySelectorAll('.btnCloseError').forEach((el) =>
            el.addEventListener('click', function () {
                this.parentNode.parentNode.remove();
            }),
        );
    }

    static _htmlError(error) {
        return `
        <div class="show toast align-items-center text-bg-danger border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">${error}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto btnCloseError"></button>
            </div>
        </div>`;
    }

    static async delete() {
        const id = new URLSearchParams(window.location.search).get('id');
        await fetch(`/product?id=${id}`, { method: 'DELETE' });
        window.location.href = '/';
    }

    static async create(e) {
        e.preventDefault();
        const $txtName = document.querySelector('#txtNameProduct');
        const $txtPrice = document.querySelector('#txtPriceProduct');
        const $txtImageUrl = document.querySelector('#txtImageUrlProduct');
        const $txtDescription = document.querySelector('#txtDescriptionProduct');
        const product = {
            name: $txtName.value,
            price: Number($txtPrice.value),
            image: $txtImageUrl.value,
            description: $txtDescription.value,
        };
        const res = await fetch(`/product`, { method: 'POST', body: JSON.stringify(product) });
        const json = await res.json();
        if (json.errors) {
            ProductAJAX._throwHtmlError(json.errors);
        } else {
            window.location.href = '/';
        }
    }

    static async update(e) {
        e.preventDefault();
        const $txtName = document.querySelector('#txtNameProduct');
        const $txtPrice = document.querySelector('#txtPriceProduct');
        const $txtImageUrl = document.querySelector('#txtImageUrlProduct');
        const $txtDescription = document.querySelector('#txtDescriptionProduct');
        const id = new URLSearchParams(window.location.search).get('id');
        const product = {
            name: $txtName.value,
            price: Number($txtPrice.value),
            image: $txtImageUrl.value,
            description: $txtDescription.value,
        };
        const res = await fetch(`/product?id=${id}`, { method: 'PUT', body: JSON.stringify(product) });
        const json = await res.json();
        if (json.errors) {
            ProductAJAX._throwHtmlError(json.errors);
        } else {
            window.location.href = `/prod?id=${id}`;
        }
    }
}

const $btnCreateProduct = document.querySelector('#btnCreateProduct');
if ($btnCreateProduct) $btnCreateProduct.addEventListener('click', ProductAJAX.create);

const $btnEditProduct = document.querySelector('#btnEditProduct');
if ($btnEditProduct) $btnEditProduct.addEventListener('click', ProductAJAX.update);

const $btnDeleteProduct = document.querySelector('#btnDeleteProduct');
if ($btnDeleteProduct) $btnDeleteProduct.addEventListener('click', ProductAJAX.delete);
