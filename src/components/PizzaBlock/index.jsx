import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, fetchReviews } from '../../redux/actions/reviews';
import Button from '../Button';
import ReviewModal from '../ReviewModal';

function PizzaBlock({ id, name, imageUrl, price, types, sizes, onClickAddPizza, addedCount }) {
  const availableTypes = ['тонкое', 'традиционное'];
  const availableSizes = [26, 30, 40];

  const [activeType, setActiveType] = React.useState(types[0]);
  const [activeSize, setActiveSize] = React.useState(0);
  const [isReviewOpen, setIsReviewOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { reviews } = useSelector(state => state.reviews);

  React.useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const pizzaReviews = reviews.filter(r => r.pizzaId === id);
  const avgRating = pizzaReviews.length
    ? (pizzaReviews.reduce((sum, r) => sum + r.rating, 0) / pizzaReviews.length).toFixed(1)
    : null;

  const onSelectType = index => {
    setActiveType(index);
  };

  const onSelectSize = index => {
    setActiveSize(index);
  };

  const onAddPizza = () => {
    const obj = {
      id,
      name,
      imageUrl,
      price,
      size: availableSizes[activeSize],
      type: availableTypes[activeType],
    };
    onClickAddPizza(obj);
  };

  const handleAddReview = ({ rating, comment }) => {
    dispatch(addReview({ pizzaId: id, pizzaName: name, rating, comment }));
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{name}</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        {avgRating ? (
          <span style={{ color: '#ff9800', fontWeight: 600, fontSize: 16 }}>★ {avgRating}</span>
        ) : (
          <span style={{ color: '#bbb', fontSize: 14 }}>Нет оценок</span>
        )}
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#ff9800',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: 14,
            marginLeft: 4,
            textDecoration: 'underline',
          }}
          onClick={() => setIsReviewOpen(true)}>
          Отзывы ({pizzaReviews.length})
        </button>
      </div>
      <div className="pizza-block__selector">
        <ul>
          {availableTypes.map((type, index) => (
            <li
              key={type}
              onClick={() => onSelectType(index)}
              className={classNames({
                active: activeType === index,
                disabled: !types.includes(index),
              })}>
              {type}
            </li>
          ))}
        </ul>
        <ul>
          {availableSizes.map((size, index) => (
            <li
              key={size}
              onClick={() => onSelectSize(index)}
              className={classNames({
                active: activeSize === index,
                disabled: !sizes.includes(size),
              })}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <Button onClick={onAddPizza} className="button--add" outline>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount && <i>{addedCount}</i>}
        </Button>
      </div>
      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onSubmit={handleAddReview}
        pizzaName={name}
        reviews={pizzaReviews}
      />
      {isReviewOpen && (
        <div style={{ marginTop: 16 }}>
          <h5 style={{ color: '#ff9800', margin: '8px 0 4px 0' }}>Отзывы:</h5>
          {pizzaReviews.length === 0 ? (
            <div style={{ color: '#999', fontSize: 14 }}>Пока нет отзывов</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pizzaReviews.map((r, idx) => (
                <div
                  key={r.id || idx}
                  style={{ background: '#faf8f6', borderRadius: 8, padding: 10 }}>
                  <div style={{ color: '#ffc107', fontWeight: 600, fontSize: 15 }}>
                    ★ {r.rating}
                  </div>
                  <div style={{ color: '#333', fontSize: 15, marginTop: 2 }}>
                    <b>{r.author || 'Аноним'}:</b> {r.comment}
                  </div>
                  <div style={{ color: '#bbb', fontSize: 12, marginTop: 4 }}>
                    {r.date && new Date(r.date).toLocaleString('ru-RU')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

PizzaBlock.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number,
  types: PropTypes.arrayOf(PropTypes.number),
  sizes: PropTypes.arrayOf(PropTypes.number),
  onClickAddPizza: PropTypes.func,
  addedCount: PropTypes.number,
};

PizzaBlock.defaultProps = {
  name: '---',
  price: 0,
  types: [],
  sizes: [],
};

export default PizzaBlock;
