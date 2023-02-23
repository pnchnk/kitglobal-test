import { useState } from "react";

//components
import Modal from "./Modal";

//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

//redux hooks
import { useAppSelector } from "../../redux/hooks";

function Header() {
  //modal
  const [modalWindow, setModalWindow] = useState<boolean>(false);

  //basket cart store
  const basket = useAppSelector((state) => state.basket.basketItems);

  //total basket items quantity
  const totalQuantity: number = basket?.reduce(
    (acc: any, item: any) => (acc += item.quantity),
    0
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {!modalWindow ? null : (
          <>
            <div
              className="modal-window"
              onClick={() => setModalWindow(false)}
            ></div>
            <div className="modal-cart">
              <h3 className="text-center mt-2 mb-3">Your products:</h3>
              {!basket?.length && (
                <div className="empty-cart">Cart is empty.</div>
              )}
              {basket?.map((item: any) => {
                return (
                  <Modal
                    item={item}
                    quantity={item.quantity}
                    key={`modal-product${item.id}`}
                  />
                );
              })}
              {!basket?.length ? null : (
                <>
                  <span className="cart__total-price">
                    Total Price:{"  "}
                    {basket.reduce(
                      (acc, item) => (acc += item?.price * item?.quantity),
                      0
                    )}
                    $
                  </span>
                </>
              )}
              <div className="dropdown-button position-relative"></div>
            </div>
          </>
        )}
        <div className="container px-4 px-lg-5">
          <div className="dropdown-button position-relative">
            <form className="d-flex">
              <button
                id="crt-btn"
                className="btn btn-outline-dark"
                type="button"
                onClick={() => setModalWindow(true)}
              >
                Cart <FontAwesomeIcon icon={faCartShopping} />
                <span className="js-amount badge bg-dark text-white ms-1 rounded-pill">
                  {totalQuantity}
                </span>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
