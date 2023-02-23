
//styles
import "./card.css";

//redux hooks
import { useAppDispatch } from "../../redux/hooks";

// redux actions
import { addToCart } from "../../redux/shoppingCart";

type Props = {
 thumbnail: string,
 price: number,
 title: string,
 id: number,
 product: any
}


function Card(props: Props) {
    const {
        thumbnail,
        price,
        title,
        // eslint-disable-next-line
        product
    } = props;
    
    const dispatch = useAppDispatch();

    const handleClick = () => {
        //add to basket
        dispatch(addToCart(props.product));
    };

    return (
        <div className="col-6 col-lg-3 mb-5">
            <div className="card h-100">
                <img
                    className="card-img-top"
                    src={thumbnail}
                    alt="product"                 
                />
                <div className="card-body p-4" >
                    <div className="text-center">
                        <h5 className="card__title">{title}</h5>
                        <div className="d-flex justify-content-between small mb-2">    
                        </div>
                        <span className="card__old-price">
                            {price}$
                        </span>{" "}
                    </div>
                </div>
                <div className="card__footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center card__btn">
                        <button
                            type="button"
                            className="btn btn-outline-dark mt-auto add-basket"
                            onClick={handleClick}
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
