import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useLanguage } from './LanguageContext';
import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function DateInput({ value, onChange, placeholder, className }: DateInputProps) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewDate, setViewDate] = useState<Date>(new Date());


  // No age restrictions - allow any age selection
  const today = useMemo(() => new Date(), []);
  const maxDate = useMemo(() => new Date(), []); // Current date as max
  const minDate = useMemo(() => new Date(1900, 0, 1), []);

  // Parse existing value
  useEffect(() => {
    if (value) {
      const [year, month, day] = value.split('-').map(Number);
      if (year && month && day && !isNaN(year) && !isNaN(month) && !isNaN(day)) {
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
          setSelectedDate(date);
          setViewDate(date);
        }
      }
    }
  }, [value]);

  // Initialize view date when modal opens
  useEffect(() => {
    if (isOpen && !selectedDate) {
      // 선택된 날짜가 없으면 5년 전을 기본값으로 설정 (반려동물 평균 연령 고려)
      const defaultDate = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
      setViewDate(defaultDate);
    }
  }, [isOpen, selectedDate]); // today 제거 - useMemo로 메모이제이션되어 불필요

  // Get localized date display
  const getDisplayValue = (): string => {
    if (!value) return '';
    
    const [year, month, day] = value.split('-').map(Number);
    if (!year || !month || !day) return '';
    
    switch (language) {
      case 'ko':
        return `${year}년 ${month}월 ${day}일`;
      case 'ja':
        return `${year}年${month}月${day}日`;
      case 'zh':
        return `${year}年${month}月${day}日`;
      case 'en':
      default:
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
    }
  };

  const getPlaceholderText = (): string => {
    switch (language) {
      case 'ko':
        return '생년월일을 선택하세요';
      case 'ja':
        return '生年月日を選択してください';
      case 'zh':
        return '请选择出生日期';
      case 'en':
      default:
        return 'Select date of birth';
    }
  };

  // Get weekday labels based on locale
  const getWeekdayLabels = (): string[] => {
    switch (language) {
      case 'ko':
        return ['월', '화', '수', '목', '금', '토', '일'];
      case 'ja':
        return ['月', '火', '水', '木', '金', '土', '日'];
      case 'zh':
        return ['一', '二', '三', '四', '五', '六', '日'];
      case 'en':
      default:
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }
  };

  // Get month name
  const getMonthName = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    switch (language) {
      case 'ko':
        return `${year}년 ${month + 1}월`;
      case 'ja':
        return `${year}年${month + 1}月`;
      case 'zh':
        return `${year}年${month + 1}月`;
      case 'en':
      default:
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long'
        });
    }
  };

  // Get week start (0 = Sunday, 1 = Monday) - memoized
  const getWeekStart = useMemo((): number => {
    return language === 'en' ? 0 : 1; // English starts on Sunday, others on Monday
  }, [language]);

  // Generate calendar grid
  const generateCalendarDays = useMemo((): (Date | null)[] => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const weekStart = getWeekStart;
    
    // Calculate the starting day of the week
    let startDay = firstDay.getDay() - weekStart;
    if (startDay < 0) startDay += 7;
    
    const days: (Date | null)[] = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    
    // Fill remaining cells to complete 6 rows (42 cells)
    while (days.length < 42) {
      days.push(null);
    }
    
    return days;
  }, [viewDate, getWeekStart]);

  // Check if date is selectable
  const isDateSelectable = useCallback((date: Date): boolean => {
    return date >= minDate && date <= maxDate;
  }, [minDate, maxDate]);

  // Check if date is today
  const isToday = useCallback((date: Date): boolean => {
    return date.toDateString() === today.toDateString();
  }, []); // today는 useMemo로 메모이제이션되어 dependency에서 제거

  // Check if date is selected
  const isSelected = useCallback((date: Date): boolean => {
    return selectedDate ? date.toDateString() === selectedDate.toDateString() : false;
  }, [selectedDate]);

  // Handle date selection
  const handleDateSelect = useCallback((date: Date, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (!isDateSelectable(date)) return;
    
    setSelectedDate(date);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    onChange(formattedDate);
    
    // Add haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  }, [isDateSelectable, onChange]);

  // Navigation handlers
  const goToPreviousMonth = useCallback(() => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);



  // 연도 선택
  const handleYearSelect = useCallback((year: number) => {
    setViewDate(prev => new Date(year, prev.getMonth(), 1));
  }, []);

  // 연도 목록 생성 (1900년부터 현재 연도까지)
  const generateYears = useMemo(() => {
    const startYear = 1900;
    const endYear = today.getFullYear();
    const years = [];
    
    for (let year = endYear; year >= startYear; year--) {
      years.push(year);
    }
    
    return years;
  }, [today]);

  // Check if navigation should be disabled
  const isPreviousDisabled = useMemo(() => {
    const prevMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    const prevMonthEnd = new Date(viewDate.getFullYear(), viewDate.getMonth(), 0);
    return prevMonthEnd < minDate;
  }, [viewDate, minDate]);

  const isNextDisabled = useMemo(() => {
    const nextMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    return nextMonth > maxDate;
  }, [viewDate, maxDate]);

  // Enhanced keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent, date?: Date) => {
    if (!date || !isDateSelectable(date)) return;
    
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        event.stopPropagation();
        handleDateSelect(date);
        break;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        break;
    }
  }, [isDateSelectable, handleDateSelect]);

  // Handle modal escape key
  const handleModalKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  const handleConfirm = useCallback(() => {
    if (selectedDate) {
      const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
      onChange(formattedDate);
    }
    setIsOpen(false);
  }, [selectedDate, onChange]);

  const calendarDays = generateCalendarDays;
  const weekdayLabels = getWeekdayLabels();

  return (
    <div className="relative">
      {/* Input Trigger */}
      <div
        className={`relative cursor-pointer ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <div 
          className="h-12 px-4 py-3 border rounded-lg flex items-center justify-between transition-all duration-200 hover:border-orange-300 focus-within:border-orange-400 shadow-sm"
          style={{
            backgroundColor: '#FAF6F2',
            borderColor: '#E5E5E5'
          }}
        >
          <span 
            className="truncate"
            style={{
              color: value ? '#333333' : '#999999',
              fontFamily: 'Inter, "Noto Sans", system-ui, sans-serif'
            }}
          >
            {value ? getDisplayValue() : getPlaceholderText()}
          </span>
          <Calendar 
            className="w-5 h-5 flex-shrink-0" 
            style={{ color: '#999999' }}
          />
        </div>
      </div>

      {/* Calendar Modal - 적당한 크기로 조정 */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-40 p-4"
          onKeyDown={handleModalKeyDown}
          onClick={(e) => {
            // 배경 클릭 시 모달 닫기
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
          tabIndex={-1}
        >
          <Card 
            className="w-full max-w-xs bg-white border-0 rounded-2xl shadow-lg"
            style={{ 
              background: 'linear-gradient(135deg, #FAF6F2 0%, #ffffff 100%)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
            }}
          >
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 
                  className="text-base font-semibold"
                  style={{ 
                    color: '#333333',
                    fontFamily: 'Inter, "Noto Sans", system-ui, sans-serif'
                  }}
                >
                  {language === 'ko' && '생년월일 선택'}
                  {language === 'ja' && '生年月日を選択'}
                  {language === 'zh' && '选择出生日期'}
                  {language === 'en' && 'Select Date of Birth'}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="w-6 h-6 p-0 hover:bg-gray-100 rounded-full"
                  aria-label="Close calendar"
                >
                  <X className="w-3 h-3" style={{ color: '#666666' }} />
                </Button>
              </div>

              {/* Month/Year Navigation */}
              <div className="flex items-center justify-between mb-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToPreviousMonth}
                  disabled={isPreviousDisabled}
                  className="w-7 h-7 p-0 hover:bg-gray-100 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-3 h-3" style={{ color: '#333333' }} />
                </Button>
                
                <div className="text-center flex-1">
                  <div 
                    className="text-sm font-medium mb-1"
                    style={{ 
                      color: '#333333',
                      fontFamily: 'Inter, "Noto Sans", system-ui, sans-serif'
                    }}
                  >
                    {getMonthName(viewDate)}
                  </div>
                  {/* 연도 선택 드롭다운 - 개선된 UI */}
                  <div className="relative">
                    <select
                      value={viewDate.getFullYear()}
                      onChange={(e) => handleYearSelect(parseInt(e.target.value))}
                      className="text-xs bg-white/80 backdrop-blur-sm border border-orange-200 outline-none cursor-pointer hover:border-orange-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 rounded-md px-2 py-1 appearance-none pr-6 transition-all duration-200"
                      style={{ 
                        color: '#F0663F',
                        fontFamily: 'Inter, "Noto Sans", system-ui, sans-serif',
                        boxShadow: '0 2px 8px rgba(240, 102, 63, 0.1)'
                      }}
                    >
                      {generateYears.map((year) => (
                        <option key={year} value={year} style={{ color: '#333333' }}>
                          {language === 'ko' && `${year}년`}
                          {language === 'ja' && `${year}年`}
                          {language === 'zh' && `${year}年`}
                          {language === 'en' && `${year}`}
                        </option>
                      ))}
                    </select>
                    {/* 커스텀 화살표 아이콘 */}
                    <div className="absolute right-1 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ChevronRight className="w-3 h-3 rotate-90" style={{ color: '#F0663F' }} />
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToNextMonth}
                  disabled={isNextDisabled}
                  className="w-7 h-7 p-0 hover:bg-gray-100 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-3 h-3" style={{ color: '#333333' }} />
                </Button>
              </div>

              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekdayLabels.map((label, index) => (
                  <div
                    key={index}
                    className="h-6 flex items-center justify-center text-xs font-medium"
                    style={{ 
                      color: '#666666',
                      fontFamily: 'Inter, "Noto Sans", system-ui, sans-serif'
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div 
                className="grid grid-cols-7 gap-1 mb-4"
                role="grid"
                aria-label="Calendar"
              >
                    {calendarDays.map((date, index) => {
                      if (!date) {
                        return <div key={index} className="h-10" />;
                      }

                      const selectable = isDateSelectable(date);
                      const todayDate = isToday(date);
                      const selected = isSelected(date);

                      return (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDateSelect(date, e);
                          }}
                          onKeyDown={(e) => handleKeyDown(e, date)}
                          disabled={!selectable}
                          className={`
                            h-8 w-8 rounded-full text-xs font-medium transition-all duration-200 relative
                            ${!selectable 
                              ? 'cursor-not-allowed opacity-30' 
                              : 'cursor-pointer hover:scale-105 hover:bg-gray-100 active:scale-95'
                            }
                            ${todayDate && !selected 
                              ? 'border-2' 
                              : 'border-0'
                            }
                            focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
                          `}
                          style={{
                            backgroundColor: selectable ? 'transparent' : '#f5f5f5',
                            color: selected ? '#ffffff' : selectable ? '#333333' : '#999999',
                            borderColor: todayDate && !selected ? '#F0663F' : 'transparent',
                            fontFamily: 'Inter, "Noto Sans", system-ui, sans-serif'
                          }}
                          aria-label={`${date.getDate()}, ${getMonthName(date)}`}
                          aria-selected={selected}
                          aria-disabled={!selectable}
                          role="gridcell"
                          tabIndex={selectable ? 0 : -1}
                        >
                          <span className="relative z-10">{date.getDate()}</span>
                          {/* 동그라미 선택 표시 */}
                          {selected && (
                            <div 
                              className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 scale-110 animate-in zoom-in duration-200"
                              style={{
                                background: 'linear-gradient(135deg, #F0663F 0%, #d45a2f 100%)',
                                zIndex: 1
                              }}
                            />
                          )}
                        </button>
                      );
                    })}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mb-3">
                <Button
                  variant="outline"
                  className="flex-1 h-9 rounded-lg border-gray-300 hover:bg-gray-50 transition-colors text-sm"
                  style={{
                    fontFamily: 'Inter, "Noto Sans", system-ui, sans-serif'
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {language === 'ko' && '취소'}
                  {language === 'ja' && 'キャンセル'}
                  {language === 'zh' && '取消'}
                  {language === 'en' && 'Cancel'}
                </Button>
                <Button
                  className="flex-1 h-9 rounded-lg text-white text-sm shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: selectedDate ? 'linear-gradient(135deg, #F0663F 0%, #d45a2f 100%)' : '#cccccc',
                    fontFamily: 'Inter, "Noto Sans", system-ui, sans-serif'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleConfirm();
                  }}
                  disabled={!selectedDate}
                >
                  {language === 'ko' && '확인'}
                  {language === 'ja' && '確認'}
                  {language === 'zh' && '确认'}
                  {language === 'en' && 'Confirm'}
                </Button>
              </div>

              {/* Pet Age Info */}
              <div 
                className="p-2 rounded-lg text-xs text-center"
                style={{ 
                  backgroundColor: 'rgba(240, 102, 63, 0.1)',
                  color: '#666666',
                  fontFamily: 'Inter, "Noto Sans", system-ui, sans-serif'
                }}
              >
                {language === 'ko' && '반려동물의 정확한 생년월일을 선택해주세요'}
                {language === 'ja' && 'ペットの正確な生年月日を選択してください'}
                {language === 'zh' && '请选择宠物的准确出生日期'}
                {language === 'en' && 'Please select your pet\'s exact date of birth'}
              </div>
            </div>
          </Card>
        </div>
      )}

      <style>{`
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          button[role="gridcell"] {
            border: 1px solid black !important;
          }
          button[role="gridcell"][aria-selected="true"] {
            background-color: black !important;
            color: white !important;
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          button[role="gridcell"] {
            transition: none !important;
          }
        }
        
        /* Improved focus styles */
        button[role="gridcell"]:focus-visible {
          outline: 2px solid #F0663F !important;
          outline-offset: 2px;
          z-index: 10;
          position: relative;
        }
        
        /* Prevent text selection on calendar */
        [role="grid"] {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
      `}</style>
    </div>
  );
}