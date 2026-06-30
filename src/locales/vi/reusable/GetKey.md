Để lấy **Public SDK Key**:

1. Truy cập Adapty Dashboard và điều hướng đến [**App settings → General**](https://app.adapty.io/settings/general).
2. Trong phần **Api keys**, sao chép **Public SDK Key** (KHÔNG phải Secret Key).
3. Thay thế `"YOUR_PUBLIC_SDK_KEY"` trong code.

Hoặc lấy theo cách lập trình, sử dụng [Adapty CLI](developer-cli):

```
npm install -g adapty
adapty auth login
adapty apps list
```

Hoặc, trực tiếp:

```
npx adapty auth login
adapty apps list
```

- Đảm bảo bạn sử dụng **Public SDK key** để khởi tạo Adapty, **Secret key** chỉ nên dùng cho [server-side API](getting-started-with-server-side-api).
- **SDK keys** là duy nhất cho mỗi ứng dụng, vì vậy nếu bạn có nhiều ứng dụng, hãy đảm bảo chọn đúng key.