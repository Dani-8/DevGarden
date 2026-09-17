import React, { useState, useEffect, FormEvent } from 'react';
import { X, ExternalLink, Star, Plus, Sparkles, MessageSquare, Award } from 'lucide-react';

export interface ShowcaseProject {
    id: string;
    title: string;
    author: string;
    authorRole: string;
    description: string;
    tags: string[];
    link?: string;
    stars: number;
    featured?: boolean;
    createdAt: number;
}