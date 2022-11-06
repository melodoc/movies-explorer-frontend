import './SearchForm.css';

export function SearchForm() {
  return (
    <div className="searchForm">
        форма поиска, куда пользователь будет вводить запрос. 
        Обратите внимание на фильтр с чекбоксом «Только короткометражки». 
        Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.
    </div>
  );
}
