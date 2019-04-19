let MT = [
  { name: 'Category_Home', type: 'category' },
  { name: 'Category_Live', type: 'category' },
  { name: 'Category_Carousel', type: 'category' },
  { name: 'Category_Series', type: 'category' },
  { name: 'Category_Movie', type: 'category' },
  { name: 'Category_Cartoon', type: 'category' },
  { name: 'Category_Anime', type: 'category' },
  { name: 'Category_Entertainment', type: 'category' },
  { name: 'Category_Records', type: 'category' },
  { name: 'Category_News', type: 'category' },
  { name: 'Category_Sports', type: 'category' },
  { name: 'Category_Game_Rank', type: 'category' },
  { name: 'Category_Game_Wonderful', type: 'category' },
  { name: 'Category_Game_Match', type: 'category' },
  { name: 'Category_Home_Top', type: 'categoryTop' },
  { name: 'Category_Live_Top', type: 'categoryTop' },
  { name: 'Category_Carousel_Top', type: 'categoryTop' },
  { name: 'Category_Series_Top', type: 'categoryTop' },
  { name: 'Category_Movie_Top', type: 'categoryTop' },
  { name: 'Category_Cartoon_Top', type: 'categoryTop' },
  { name: 'Category_Anime_Top', type: 'categoryTop' },
  { name: 'Category_Entertainment_Top', type: 'categoryTop' },
  { name: 'Category_Records_Top', type: 'categoryTop' },
  { name: 'Category_News_Top', type: 'categoryTop' },
  { name: 'Category_Sports_Top', type: 'categoryTop' },
  { name: 'Category_Asset_List', type: 'categoryList' },
  { name: 'Category_Subject_List', type: 'categoryList' },
  { name: 'Category_Title_News_List', type: 'categoryList' },
  { name: 'Category_Title_Asset_List', type: 'categoryList' },
  { name: 'Category_Title_Actor_List', type: 'categoryList' },
  { name: 'Category_Title_Role_List', type: 'categoryList' },
  { name: 'Category_Asset_List_Wide', type: 'categoryList' },
  { name: 'Category_Game_Tag_List', type: 'categoryList' },
  { name: 'Category_Game_Rank_List', type: 'categoryList' },
  { name: 'Category_Game_Match_List', type: 'categoryList' },
  { name: 'Category_Game_Subject_List', type: 'categoryList' },
  { name: 'Category_Title_Asset_List_Not_More', type: 'categoryList' },
  { name: 'Subject_Detail_TP1', type: 'categorySubject' },
  { name: 'Detail_News', type: 'categoryDetail' },
  { name: 'Detail_Series', type: 'categoryDetail' },
  { name: 'Detail_Movie', type: 'categoryDetail' },
  { name: 'Detail_Anime_Series', type: 'categoryDetail' },
  { name: 'Detail_Anime_Movie', type: 'categoryDetail' }
]

function fc (name) {
  let _temp = {}
  let isType = ''
  for (let c in MT) {
    if (name == MT[c].name) {
      isType = MT[c].type
      break
    }
  }
  // console.log(isType);
  return isType
}

export { MT, fc }
