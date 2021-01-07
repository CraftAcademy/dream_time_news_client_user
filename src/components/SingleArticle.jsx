import React, { useEffect } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { getArticleData } from '../modules/articlesData';
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const SingleArticle = () => {
  const dispatch = useDispatch()
  const { singleArticle, errorMessage } =  useSelector((state) => state)
  const { id } = useParams()

  useEffect(() => {
    getArticleData.show(id, dispatch)
  }, [id, dispatch])
  return (
    <>
      {singleArticle && (
        <>
          <Grid>
            <Grid.Column width={9}>
              <h1 data-cy="article-title">{singleArticle.title}</h1>
              <h3 data-cy="article-sub-title">{singleArticle.sub_title}</h3>
              <p data-cy="article-content">{singleArticle.content}</p>
            </Grid.Column>
            <Grid.Column width={4}>
              <p data-cy="article-created-at">{`Created at: ${singleArticle.created_at}`}</p>
              <p data-cy="article-updated-at">{`Updated at: ${singleArticle.updated_at}`}</p>
              <p data-cy="article-author">{singleArticle.author}</p>
            </Grid.Column>
          </Grid>
          <Button data-cy="back-button" onClick={() => getArticleData()}>
            back
          </Button>
        </>
      )}
    </>
  );
};


// const SingleArticle = ({ singleArticle, getArticles }) => {
//   return (
//     <>
//       {singleArticle && (
//         <>
//           <Grid>
//             <Grid.Column width={9}>
//               <h1 data-cy="article-title">{singleArticle.title}</h1>
//               <h3 data-cy="article-sub-title">{singleArticle.sub_title}</h3>
//               <p data-cy="article-content">{singleArticle.content}</p>
//             </Grid.Column>
//             <Grid.Column width={4}>
//               <p data-cy="article-created-at">{`Created at: ${singleArticle.created_at}`}</p>
//               <p data-cy="article-updated-at">{`Updated at: ${singleArticle.updated_at}`}</p>
//               <p data-cy="article-author">{singleArticle.author}</p>
//             </Grid.Column>
//           </Grid>
//           <Button data-cy="back-button" onClick={() => getArticles()}>
//             back
//           </Button>
//         </>
//       )}
//     </>
//   );
// };

export default SingleArticle;
