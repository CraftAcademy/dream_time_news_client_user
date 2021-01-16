import React, { useEffect } from "react";
import { Button, Image, Message, Container, Grid } from "semantic-ui-react";
import { getArticleData } from "../modules/articlesData";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SingleArticle = () => {
  const { t } = useTranslation();
  const { singleArticle, errorMessage } = useSelector((state) => state);
  const { id } = useParams();

  useEffect(() => {
    getArticleData.show(id);
  }, [id]);
  return (
    <Container>
      <Grid>
        <Grid.Column width={4}>
          <h1 data-cy="article-title">{singleArticle.title}</h1>
          <Image src={singleArticle.image} />
          <h3 data-cy="article-sub-title">{singleArticle.sub_title}</h3>
          <p data-cy="article-content">{singleArticle.content}</p>
        </Grid.Column>
        <Grid.Column width={9}>
          <p data-cy="article-created-at">{`${t ("CreatedAt")} ${singleArticle.created_at}`}</p>
          <p data-cy="article-author">{singleArticle.author}</p>
        </Grid.Column>
      </Grid>
      <Button data-cy="back-button" as={NavLink} to="/" color="twitter">
      {t ("Back")}
      </Button>
      {errorMessage && (
        <Message
          color="red"
          data-cy="error-message-article"
          header={errorMessage}
        />
      )}
    </Container>
  );
};

export default SingleArticle;
