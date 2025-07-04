import React, { useState } from 'react';
import './ReviewModal.scss';

const ReviewModal = ({ isOpen, onClose, onSubmit, pizzaName, reviews = [] }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (rating === 0) {
      alert('Пожалуйста, поставьте оценку');
      return;
    }
    onSubmit({ rating, comment, author: author.trim() || 'Аноним' });
    setRating(0);
    setComment('');
    setAuthor('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="review-modal-overlay" onClick={onClose}>
      <div className="review-modal" onClick={e => e.stopPropagation()}>
        <div className="review-modal__header">
          <h3>Оставить отзыв</h3>
          <button className="review-modal__close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="review-modal__content">
          <p className="review-modal__pizza-name">{pizzaName}</p>
          <div className="review-modal__rating">
            <p>Ваша оценка:</p>
            <div className="stars">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  className={`star ${star <= rating ? 'star--active' : ''}`}
                  onClick={() => setRating(star)}>
                  ★
                </button>
              ))}
            </div>
            <p className="rating-text">{rating > 0 ? `${rating} из 5` : 'Поставьте оценку'}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ваше имя (необязательно)"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              style={{
                width: '100%',
                marginBottom: 10,
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid #eee',
                fontSize: 16,
              }}
            />
            <textarea
              placeholder="Напишите ваш отзыв (необязательно)"
              value={comment}
              onChange={e => setComment(e.target.value)}
              rows={4}
            />
            <div className="review-modal__actions">
              <button type="button" onClick={onClose} className="btn-secondary">
                Отмена
              </button>
              <button type="submit" className="btn-primary">
                Отправить
              </button>
            </div>
          </form>
          <hr style={{ margin: '24px 0 16px 0', border: 0, borderTop: '1px solid #eee' }} />
          <h4 style={{ color: '#ff9800', margin: '0 0 12px 0' }}>Отзывы:</h4>
          {reviews.length === 0 ? (
            <div style={{ color: '#999', fontSize: 15 }}>Пока нет отзывов</div>
          ) : (
            <div
              style={{
                maxHeight: 220,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}>
              {reviews.map((r, idx) => (
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
      </div>
    </div>
  );
};

export default ReviewModal;
