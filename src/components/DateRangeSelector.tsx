import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DateRangeSelectorProps {
  initialDateRange?: DateRange;
  onDateChange: (dateRange: DateRange | undefined) => void;
  className?: string;
  align?: "start" | "center" | "end";
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  initialDateRange,
  onDateChange,
  className,
  align = "start"
}) => {
  const [date, setDate] = useState<DateRange | undefined>(
    initialDateRange || {
      from: addDays(new Date(), -7), // Default to last 7 days
      to: new Date(),
    }
  );
  const [isOpen, setIsOpen] = useState(false);

  console.log("Rendering DateRangeSelector, current range:", date);

  const handleSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    onDateChange(selectedDate);
    setIsOpen(false); // Close popover on selection
    console.log("Date range selected:", selectedDate);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal md:w-[300px]', // Responsive width
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2} // Show two months for easier range selection
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateRangeSelector;