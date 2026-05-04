import React from 'react';
import { FiUser, FiMail, FiTwitter, FiLinkedin } from 'react-icons/fi';

/**
 * AuthorBox Component
 * Displays author information with bio and social links
 * Supports E-E-A-T requirements
 */
export default function AuthorBox({ 
  name, 
  role, 
  bio, 
  avatar,
  email,
  twitter,
  linkedin 
}) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-black/5">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#15a36e]/20 flex items-center justify-center flex-shrink-0">
          {avatar ? (
            <img 
              src={avatar} 
              alt={name} 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <FiUser className="w-8 h-8 text-[#15a36e]" />
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
            <h4 
              className="text-lg font-bold text-black"
              style={{ fontFamily: 'Palanquin, sans-serif' }}
            >
              {name}
            </h4>
            {role && (
              <span className="text-sm text-[#15a36e] font-semibold" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                {role}
              </span>
            )}
          </div>
          
          {bio && (
            <p className="text-sm text-gray-600 leading-relaxed mb-3" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              {bio}
            </p>
          )}
          
          {/* Social Links */}
          {(email || twitter || linkedin) && (
            <div className="flex items-center gap-3">
              {email && (
                <a 
                  href={`mailto:${email}`}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all"
                  aria-label="Email"
                >
                  <FiMail className="w-4 h-4" />
                </a>
              )}
              {twitter && (
                <a 
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all"
                  aria-label="Twitter"
                >
                  <FiTwitter className="w-4 h-4" />
                </a>
              )}
              {linkedin && (
                <a 
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#15a36e] hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
