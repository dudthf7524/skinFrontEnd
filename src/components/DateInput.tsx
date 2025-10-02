import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { useLanguage } from './LanguageContext';
import { Calendar } from 'lucide-react';

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function DateInput({ value, onChange, className }: DateInputProps) {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewDate, setViewDate] = useState<Date>(new Date());


  // No age restrictions - allow any age selection
  const today = useMemo(() => new Date(), []);
  const maxDate = useMemo(() => new Date(2100, 11, 31), []); // Allow future dates up to 2100
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
      // 선택된 날짜가 없으면 오늘 날짜를 기본값으로 설정
      setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    }
  }, [isOpen, selectedDate, today]);

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

  const getWeekStart = useMemo((): number => {
    return language === 'en' ? 0 : 1;
  }, [language]);

  const generateCalendarDays = useMemo((): (Date | null)[] => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const weekStart = getWeekStart;

    let startDay = firstDay.getDay() - weekStart;
    if (startDay < 0) startDay += 7;

    const days: (Date | null)[] = [];

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    while (days.length < 42) {
      days.push(null);
    }

    return days;
  }, [viewDate, getWeekStart]);

  const isDateSelectable = useCallback((date: Date): boolean => {
    return date >= minDate && date <= maxDate;
  }, [minDate, maxDate]);

  const isToday = useCallback((date: Date): boolean => {
    return date.toDateString() === today.toDateString();
  }, []);

  const isSelected = useCallback((date: Date): boolean => {
    return selectedDate ? date.toDateString() === selectedDate.toDateString() : false;
  }, [selectedDate]);

  const handleDateSelect = useCallback((date: Date, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!isDateSelectable(date)) return;

    setSelectedDate(date);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    onChange(formattedDate);


    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  }, [isDateSelectable, onChange]);


  const goToPreviousMonth = useCallback(() => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const goToPreviousYear = useCallback(() => {
    setViewDate(prev => new Date(prev.getFullYear() - 1, prev.getMonth(), 1));
  }, []);

  const goToNextYear = useCallback(() => {
    setViewDate(prev => new Date(prev.getFullYear() + 1, prev.getMonth(), 1));
  }, []);

  const handleYearSelect = useCallback((year: number) => {
    setViewDate(prev => new Date(year, prev.getMonth(), 1));
  }, []);

  const generateYears = useMemo(() => {
    const startYear = 1900;
    const endYear = 2100;
    const years = [];

    for (let year = endYear; year >= startYear; year--) {
      years.push(year);
    }

    return years;
  }, []);

  const isPreviousDisabled = useMemo(() => {
    const prevMonthEnd = new Date(viewDate.getFullYear(), viewDate.getMonth(), 0);
    return prevMonthEnd < minDate;
  }, [viewDate, minDate]);

  const isNextDisabled = useMemo(() => {
    const nextMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    return nextMonth > maxDate;
  }, [viewDate, maxDate]);

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
          className="fixed inset-0 bg-black/30 flex items-center justify-center p-4"
          style={{ zIndex: 10000 }}
          onKeyDown={handleModalKeyDown}
          onClick={(e) => {
            // 배경 클릭 시 모달 닫기
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
          tabIndex={-1}
        >
          <div className="w-full max-w-xs bg-white border border-gray-300 rounded p-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Month/Year Navigation */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-1">
                <button
                  onClick={goToPreviousYear}
                  className="px-1 py-1 text-gray-600 hover:text-gray-800 text-sm"
                  title={t('previousYear')}
                >
                  &lt;&lt;
                </button>
                <button
                  onClick={goToPreviousMonth}
                  disabled={isPreviousDisabled}
                  className="px-1 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-30 text-sm"
                  title={t('previousMonth')}
                >
                  &lt;
                </button>
              </div>

              <div className="text-center flex-1">
                <div className="text-sm font-medium flex items-center justify-center">
                  {language === 'en' ? (
                    // English: Month Year
                    <>
                      <span className="text-sm font-medium">
                        {viewDate.getMonth() + 1}
                      </span>
                      <span className="text-sm font-medium">.</span>
                      <span className="mx-2"></span>
                      <select
                        value={viewDate.getFullYear()}
                        onChange={(e) => handleYearSelect(parseInt(e.target.value))}
                        className="bg-transparent border-0 outline-0 cursor-pointer pr-0 pl-1 py-1 text-sm font-medium appearance-none"
                        style={{
                          backgroundImage: 'none',
                          WebkitAppearance: 'none',
                          MozAppearance: 'none'
                        }}
                      >
                        {generateYears.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <span className="text-sm font-medium">.</span>
                    </>
                  ) : (
                    <>
                      <select
                        value={viewDate.getFullYear()}
                        onChange={(e) => handleYearSelect(parseInt(e.target.value))}
                        className="bg-transparent border-0 outline-0 cursor-pointer pr-0 pl-1 py-1 text-sm font-medium appearance-none"
                        style={{
                          backgroundImage: 'none',
                          WebkitAppearance: 'none',
                          MozAppearance: 'none'
                        }}
                      >
                        {generateYears.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <span className="text-sm font-medium">{t('year')}</span>
                      <span className="mx-2"></span>
                      <span className="text-sm font-medium">
                        {viewDate.getMonth() + 1}
                      </span>
                      <span className="text-sm font-medium">{t('month')}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={goToNextMonth}
                  disabled={isNextDisabled}
                  className="px-1 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-30 text-sm"
                  title={t('nextMonth')}
                >
                  &gt;
                </button>
                <button
                  onClick={goToNextYear}
                  className="px-1 py-1 text-gray-600 hover:text-gray-800 text-sm"
                  title={t('nextYear')}
                >
                  &gt;&gt;
                </button>
              </div>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekdayLabels.map((label, index) => (
                <div
                  key={index}
                  className="h-6 flex items-center justify-center text-xs font-medium text-gray-600"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-3">
              {calendarDays.map((date, index) => {
                if (!date) {
                  return <div key={index} className="h-9" />;
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
                    disabled={!selectable}
                    className={`
                        h-9 w-full rounded text-sm font-medium border
                        ${!selectable
                        ? 'cursor-not-allowed opacity-30 bg-gray-100'
                        : selected
                          ? 'bg-orange-500 text-white border-orange-500'
                          : todayDate
                            ? 'bg-orange-100 text-orange-700 border-orange-400'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }
                      `}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                className="flex-1 h-10 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm"
                onClick={() => setIsOpen(false)}
              >
                {t('cancel')}
              </button>
              <button
                className="flex-1 h-10 rounded text-white disabled:opacity-50 text-sm"
                style={{
                  backgroundColor: selectedDate ? '#F0663F' : '#cccccc',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleConfirm();
                }}
                disabled={!selectedDate}
              >
                {t('confirm')}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}