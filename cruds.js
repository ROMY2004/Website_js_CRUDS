let product_name = document.getElementById('product_name');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let Data_Of_Products = [];
let mood = '  Create';
let tmp;
let search_mood = 'Title';
if (this.localStorage.Product != null)
{
    Data_Of_Products = JSON.parse(localStorage.Product);
}
function Get_Total()
{
    if (price.value != '')
    {
        let Total_Price = (+price.value + +taxes.value) - (+discount.value);
        total.innerHTML = Total_Price;
        total.style.background = '#6dd734';

    }
    else
    {
        total.innerHTML = '';
        total.style.background = '#ed3838';
    }

    
}
create.onclick = function () {
    let Data_Of_Product = {
        product_named: product_name.value.toLowerCase(),
        priced: price.value,
        taxesd: taxes.value,
        count: count.value,
        discountd: discount.value,
        totald: total.innerHTML,
        categoryd: category.value.toLowerCase(),
    };
    if (product_name.value != '' && price.value != '' && category.value != '' && count.value <= 500)
    {
        if (mood === 'Create')
        {
            for (let c = 0; c <= Data_Of_Product.count; c++)
            {
                Data_Of_Products.push(Data_Of_Product);
            }
        }
        else
        {
            Data_Of_Products[tmp] = Data_Of_Product;
            mood = 'Create';
            create.innerHTML = mood;
            count.style.display = 'block';
        }
    localStorage.setItem('Product', JSON.stringify(Data_Of_Products));
    Clear_Data();
    Show_Data_Of_Products();
    }
}
function Clear_Data()
{
    product_name.value = '';
    price.value = '';
    taxes.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
function Show_Data_Of_Products()
{
    let Table = '';
    for (let i = 0; i < Data_Of_Products.length; i++)
    {
        Table += `
        <tr>
            <td>${i + 1}</td>
            <td>${Data_Of_Products[i].product_named}</td>
            <td>${Data_Of_Products[i].priced}</td>
            <td>${Data_Of_Products[i].taxesd}</td>
            <td>${Data_Of_Products[i].discountd}</td>
            <td>${Data_Of_Products[i].totald}</td>
            <td>${Data_Of_Products[i].categoryd}</td>
            <td><button onclick='Update_Data_Product(${i})' id="update">Update</button></td>
            <td><button onclick='Delete_Product(${i})' id="delete">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = Table;
    let Delete_All = document.getElementById('Delete_All_Products');
    if (Data_Of_Products.length > 0)
    {
        Delete_All.innerHTML = `
            <button onclick='Delete_for_All()'>Delete All (${Data_Of_Products.length})</button>
        `;
    } else {
        Delete_All.innerHTML = ``;
    }
}
function Delete_Product(i)
{
    Data_Of_Products.splice(i, 1);
    localStorage.Product = JSON.stringify(Data_Of_Products);
    Show_Data_Of_Products();
}
function Delete_for_All()
{
    localStorage.clear();
    Data_Of_Products.splice(0);
    Show_Data_Of_Products();
}
function Update_Data_Product(i)
{
    product_name.value =Data_Of_Products[i].product_named;
    price.value =Data_Of_Products[i].priced;
    taxes.value =Data_Of_Products[i].taxesd;
    discount.value =Data_Of_Products[i].discountd;
    total.value =Data_Of_Products[i].totald;
    category.value = Data_Of_Products[i].categoryd;
    Get_Total();
    count.style.display = 'none';
    mood = 'Update';
    create.innerHTML = mood;
    tmp = i;
}
function Search_By(id)
{
    let searchh = document.getElementById('search');
    if (id == 'searchtitle')
    {
        search_mood = 'Title';
    }
    else
    {
        search_mood = 'Category';
    }
    searchh.Placeholder = 'Search By ' + search_mood;
    searchh.focus();
    searhh.value = '';
    Show_Data_Of_Products();
}
function Search_Products(value)
{
    let table = '';
    if (search_mood == 'Title')
    {
        for (let l = 0; l < Data_Of_Products.length; l++) {
            if (Data_Of_Products[l].product_named.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${l + 1}</td>
                        <td>${Data_Of_Products[l].product_named}</td>
                        <td>${Data_Of_Products[l].priced}</td>
                        <td>${Data_Of_Products[l].taxesd}</td>
                        <td>${Data_Of_Products[l].discountd}</td>
                        <td>${Data_Of_Products[l].totald}</td>
                        <td>${Data_Of_Products[l].categoryd}</td>
                        <td><button onclick='Update_Data_Product(${l})' id="update">Update</button></td>
                        <td><button onclick='Delete_Product(${l})' id="delete">Delete</button></td>
                    </tr>
                    `;
            }
        }
    }
    else
    {
        for (let l = 0; l < Data_Of_Products.length; l++)
        {
            if (Data_Of_Products[l].categoryd.includes(value.toLowerCase()))
            {
                table += `
                    <tr>
                        <td>${l + 1}</td>
                        <td>${Data_Of_Products[l].product_named}</td>
                        <td>${Data_Of_Products[l].priced}</td>
                        <td>${Data_Of_Products[l].taxesd}</td>
                        <td>${Data_Of_Products[l].discountd}</td>
                        <td>${Data_Of_Products[l].totald}</td>
                        <td>${Data_Of_Products[l].categoryd}</td>
                        <td><button onclick='Update_Data_Product(${l})' id="update">Update</button></td>
                        <td><button onclick='Delete_Product(${l})' id="delete">Delete</button></td>
                    </tr>
                    `;
            }
        }
    }
        document.getElementById('tbody').innerHTML = table;
}
Show_Data_Of_Products();