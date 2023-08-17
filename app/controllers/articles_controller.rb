class ArticlesController < ApplicationController
    def top_posts
        @top_posts = Article.order(post_likes: :desc, post_comments: :desc).limit(5)
    
        render json: @top_posts, status: :ok
    end
    before_action :authenticate_user!
    def home
        @articles = Article.all
    

        @articles = @articles.where(author: params[:author]) if params[:author].present?
    
        @articles = @articles.where("DATE(created_at) = ?", params[:date]) if params[:date].present?
    

        @articles = @articles.order(post_likes: :desc) if params[:sort_likes].present?
    

        @articles = @articles.order(post_comments: :desc) if params[:sort_comments].present?
    
        render json: @articles
    end

    def create
        @article = Article.create(title: params[:title], topic: params[:topic],  file: params[:file], description: params[:description], author: params[:author], user_id: params[:user_id], published_at: params[:published_at])

        
        word_count = @article.description.split.size
        reading_speed = 150
        minutes = (word_count.to_f / reading_speed).ceil
        @article.minutes_to_read = minutes

    
        @article.post_likes = 0
        @article.post_comments = 0
    
        if @article.save
           render json: @article
        else
            render json: Article.all
        end
    end

    def update 
        article1 = Article.find_by(id: params[:id])
        article1.update(article_params)
        if article1.published_at.blank?
          ArticleRevision.create(
            article: article1,
            title: article1.title,
            topic: article1.topic,
            description: article1.description,
            author: article1.author
          )
        end
  
        render json: Article.all()
    end
    
    def delete
        render json: Article.destroy_by(id: params[:id])
    end

    def search
        search_query = params[:query].downcase
    
        @articles = Article.where("LOWER(title) LIKE ? OR LOWER(topic) LIKE ? OR LOWER(author) LIKE ?", "%#{search_query}%", "%#{search_query}%", "%#{search_query}%")
    
        render json: @articles
    end

    def like
        @article = Article.find(params[:id])
        @article.increment!(:post_likes)
        render json: @article, status: :ok
    end

    def comment
        @article = Article.find(params[:id])
        @article.increment!(:post_comments)
        render json: @article, status: :ok
    end

    def recommended_posts
        user = current_user
        interested_topics = user.profile.interested_topics
        @recommended_posts = Article.where(topic: interested_topics)

        render json: @recommended_posts, status: :ok
    end


    def articles_by_topic
        @articles = Article.where(topic: params[:topic])

        render json: @articles, status: :ok
    end

    def drafts
        @articles = Article.draft

        render json: @articles, status: :ok
    end

    def revisions
        @article = Article.find(params[:id])
        @revisions = @article.article_revisions
        render json: @revisions
    end
    
    def save_for_later
        article = Article.find(params[:id])
        current_user.saved_articles.create(article: article)
        render json: current_user.saved_articles
    end
    
    private
    
    def article_params
        params.require(:article).permit(:title, :topic, :description, :author, :user_id, :published_at)
    end
end
