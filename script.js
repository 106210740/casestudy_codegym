//PHẦN 1: LOGIC OOP VÀ DỮ LIỆU

class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    // Trả về chuỗi HTML để dễ dàng chèn vào <ul> trong trang web
    get displayInfo() {
        // .toLocaleString('vi-VN') giúp hiển thị định dạng số tiền Việt Nam
        return `<li><strong>${this.name}</strong> - Giá: ${this.price.toLocaleString('vi-VN')} VND | Tồn kho: ${this.quantity}</li>`;
    }
}

const inventory = []; // Mảng chứa các đối tượng Product

//PHẦN 2: THAO TÁC DOM VÀ HÀM XỬ LÝ

// Hàm hiển thị thông báo trạng thái
function showMessage(text, isError = false) {
    const msgElement = document.getElementById('message');
    msgElement.textContent = text;
    // Điều kiện: đổi màu chữ nếu là lỗi
    msgElement.style.color = isError ? 'red' : 'green'; 
}

// Hàm xử lý khi nhấn nút Thêm Sản Phẩm
function handleAddProduct() {
    // 1. Lấy dữ liệu từ các trường nhập liệu 
    const nameInput = document.getElementById('product-name');
    const priceInput = document.getElementById('product-price');
    const quantityInput = document.getElementById('product-quantity');

    const name = nameInput.value.trim();
    const price = parseInt(priceInput.value);
    const quantity = parseInt(quantityInput.value);

    // 2. Kiểm tra dữ liệu 
    if (!name || isNaN(price) || isNaN(quantity) || price <= 0 || quantity < 0) {
        showMessage("Vui lòng nhập đầy đủ và chính xác (Giá > 0, Số lượng >= 0).", true);
        return;
    }

    // 3. Thêm vào mảng
    const newProduct = new Product(name, price, quantity);
    inventory.push(newProduct);
    showMessage(`✅ Đã thêm sản phẩm: ${name}`, false);

    // Xóa nội dung input và cập nhật danh sách
    nameInput.value = '';
    priceInput.value = '';
    quantityInput.value = '';
    listProducts();
}

// Hàm liệt kê sản phẩm và cập nhật hiển thị
function listProducts() {
    const listElement = document.getElementById('inventory-list');
    
    // Kiểm tra cấu trúc điều kiện: Nếu kho trống
    if (inventory.length === 0) {
        listElement.innerHTML = '<li>Kho hàng trống. Vui lòng thêm sản phẩm!</li>';
        return;
    }

    let htmlList = '';
    
    // Cấu trúc Lặp để duyệt qua mảng
    for (const product of inventory) {
        // Ghép chuỗi HTML từ các đối tượng Product
        htmlList += product.displayInfo; 
    }
    
    // Cập nhật nội dung HTML của thẻ <ul>
    listElement.innerHTML = htmlList;
}

// Tự động thêm dữ liệu mẫu và hiển thị khi trang web được tải
document.addEventListener('DOMContentLoaded', () => {
    inventory.push(new Product("Laptop Dell XPS", 35000000, 2));
    inventory.push(new Product("Tai nghe Sony WH-1000XM5", 7000000, 15));
    listProducts(); // Gọi hàm hiển thị ngay khi tải trang
});