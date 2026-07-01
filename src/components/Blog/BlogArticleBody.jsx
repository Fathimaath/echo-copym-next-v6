import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import BlogContentRenderer from './BlogContentRenderer';
import BlogBelowFold from './BlogBelowFold';
import Image from '../Image';

export default function BlogArticleBody({ article, relatedPosts, youMayAlsoLike }) {
  const authorObj = article.authorData || {
    name: typeof article.author === 'string' ? article.author : 'CopyM Team',
    role: '',
    bio: ''
  };

  return (
    <article>
      <header className="mb-8 sm:mb-10 lg:mb-12 pt-8 lg:pt-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 uppercase tracking-tight text-gray-900">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed !mb-8">
            {article.subtitle}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 py-5 border-y border-gray-100 mb-7">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#15a36e]/20 flex items-center justify-center flex-shrink-0">
              {authorObj?.avatar ? (
                <Image src={authorObj.avatar} alt={authorObj.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-xs font-bold text-[#15a36e]">{authorObj?.name?.charAt(0) || 'C'}</span>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900 !mb-0">
                {authorObj?.name || 'CopyM Team'}
              </p>
              <p className="text-xs text-gray-500 !mb-0">{authorObj?.role || 'Research Team'}</p>
            </div>
          </div>

          <div className="h-5 w-px bg-gray-200 hidden sm:block"></div>

          <span className="bg-[#15a36e]/10 text-[#15a36e] px-3.5 py-1.5 text-xs font-semibold rounded">
            {article.category}
          </span>

          <div className="flex items-center gap-3.5 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>
        </div>

        {article.image && (
          <div className="rounded-xl overflow-hidden mb-10">
            <Image src={article.image} alt={article.title} className="w-full h-40 sm:h-56 md:h-72 lg:h-96 object-cover" />
          </div>
        )}
      </header>

      <div
        className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-800 leading-relaxed"
      >
        {article.contentBlocks && article.contentBlocks.length > 0 ? (
          <BlogContentRenderer contentBlocks={article.contentBlocks} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        )}
      </div>

      <BlogBelowFold article={article} relatedPosts={relatedPosts} youMayAlsoLike={youMayAlsoLike} />

      <div id="article-end-sentinel" />
    </article>
  );
}
