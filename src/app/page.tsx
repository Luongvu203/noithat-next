"use client";

import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";

import "./styles/reset.css";
import "./styles/styles.css";

import FeatureItems from "./components/js/FeatureItems";
import InstagramGallery from "./components/js/InstagramGallery";
import Bestseller from "./components/Bestseller";

export default function Home() {

  return (

    <div className="body-contai-full">

      <Header />

      <Banner />

      <section className="features">
        <div className="container-haz">
          <div className="feature-item">
            <img src="image/anh1.png" alt="Tinh tế" />
            <p className="feature-title dely">Tinh tế</p>
          </div>
          <div className="feature-item center">
            <img src="image/anh2.png" alt="Trẻ trung" />
            <p className="feature-title">Trẻ trung</p>
          </div>
          <div className="feature-item">
            <img src="image/anh3.png" alt="Thanh thoát" />
            <p className="feature-title dely">Thanh thoát</p>
          </div>
          <div className="feature-item center">
            <img src="image/anh4.png" alt="Ấm cúng" />
            <p className="feature-title">Ấm cúng</p>
          </div>
        </div>
      </section>
      <section className="features-class">
        <div className="container-haz">
          <div className="feature-item">
            <img src="image/anh1.png" alt="Tinh tế" />
            <p className="feature-title fame-of">Tinh tế</p>
          </div>
          <div className="feature-item">
            <img src="image/anh2.png" alt="Trẻ trung" />
            <p className="feature-title fame-of">Trẻ trung</p>
          </div>
          <div className="feature-item">
            <img src="image/anh3.png" alt="Thanh thoát" />
            <p className="feature-title fame-of">Thanh thoát</p>
          </div>
          <div className="feature-item">
            <img src="image/anh4.png" alt="Ấm cúng" />
            <p className="feature-title fame-of">Ấm cúng</p>
          </div>
        </div>
        <FeatureItems />
      </section>

      <section className="design-showcase">
        <div className="showcase-container">
          <div className="showcase-text">
            <h2>Sự tươi mới qua từng góc nhìn</h2>
            <hr />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
              luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>
          <div className="showcase-images">
            <img src="image/anh5.png" alt="Kitchen" />
            <img src="image/anh6.png" alt="Decor" />
          </div>
        </div>
      </section>

      <Bestseller />


      <section className="why-choose-us">
        <h2>Tại sao nên chọn chúng tôi</h2>
        <div className="features-text">
          <div className="text-us">
            <h3>Mẫu mã đa dạng, độc đáo</h3>
            <p>
              Những sản phẩm của chúng tôi không chỉ là sự kết hợp hoàn hảo giữa
              chức năng và thẩm mỹ, mà còn mang tính cá nhân và độc nhất vô nhị.
            </p>
          </div>
          <div className="text-us">
            <h3>Chất lượng vượt trội</h3>
            <p>
              Chúng tôi sử dụng nguyên vật liệu cao cấp và quy trình sản xuất
              hiện đại để đảm bảo chất lượng tốt nhất cho khách hàng.
            </p>
          </div>
          <div className="text-us">
            <h3>Chăm sóc khách hàng tận tâm</h3>
            <p>
              Đội ngũ nhân viên sẵn sàng hỗ trợ khách hàng mọi lúc, đảm bảo trải
              nghiệm mua hàng tốt nhất.
            </p>
          </div>
        </div>
      </section>

      <section className="instagram-gallery">
        <InstagramGallery />
        <h2>#ChiaSẻKhôngGianSống</h2>
        <p>
          Chia sẻ trải nghiệm của bạn với sản phẩm của chúng tôi thông qua
          Instagram cùng hashtag trên nhé!
        </p>
        <div className="gallery">
          <img src="image/anh11.png" alt="Hình 1" />
          <img src="image/anh12.png" alt="Hình 2" />
          <img src="image/anh13.png" alt="Hình 3" />
          <img src="image/anh14.png" alt="Hình 4" />
        </div>
        <button className="follow-btn">Theo dõi chúng tôi</button>
      </section>

      <div className="devery-container">

        <div className="body-container">
          <div className="container-form-title">
            <div className="container-form-title-off">
              <h2>Đăng ký ngay</h2>
              <p>
                Đăng ký để nhận những thông tin mới nhất về sản phẩm, sự kiện,
                khuyến mãi,...
              </p>
            </div>
            <form>
              <label htmlFor="name">* Họ tên</label>
              <input
                id="in-very"
                type="text"
                placeholder="Nhập họ tên"
                required
              />

              <label htmlFor="email">* Email</label>
              <input
                id="in-very"
                type="email"
                placeholder="Nhập email"
                required
              />

              <button type="submit">Gửi</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
