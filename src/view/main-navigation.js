const createMainNavigationItemTemplate = (filter) => {
  const {name, count} = filter;

  return (
    `
    <a href="#${name}" class="main-navigation__item">${name}
    <span class="main-navigation__item-count">${count}</span></a>
    `
  );

};


export const createMainNavigationTemplate = (filtersItem) => {

  const mainNavigationItemTemplate = filtersItem.map((filter) => {
    return createMainNavigationItemTemplate(filter);
  }).join(``);

  return (`
      <nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" class="main-navigation__item">All movies</a>
          ${mainNavigationItemTemplate}
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>
    `);
};
